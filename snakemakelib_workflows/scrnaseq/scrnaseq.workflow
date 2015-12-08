# -*- snakemake -*-
import os
import shutil
import pandas as pd
from os.path import join, dirname, relpath, exists, basename
from snakemake.utils import update_config, set_temporary_output, set_protected_output
from snakemake.workflow import workflow
from snakemake_rules import SNAKEMAKE_RULES_PATH
from snakemakelib.io import make_targets, IOTarget, IOAggregateTarget
from snakemakelib.odo import star, rseqc 
from snakemakelib.sample.input import initialize_input
from snakemakelib_workflows.scrnaseq.app import *
from snakemakelib.application import SampleApplication, PlatformUnitApplication

# Collect information about inputs; _samples stores a list of
# dictionaries, where each dictionary contains information on a sample
config["_samples"] = initialize_input(src_re = config['settings']['sample_organization'].raw_run_re,
                                      sampleinfo = config['settings'].get('sampleinfo', None),
                                      metadata = config['settings'].get('metadata', None),
                                      metadata_filter = config['settings'].get('metadata_filter', None),
                                      filter_suffix = config['bio.ngs.settings'].get("filter_suffix", ""),
                                      sample_column_map = config['bio.ngs.settings'].get("sample_column_map", ""),
                                      sample_filter = config.get("samples", None))
_samples = config["_samples"]
    
# FIXME: These functions will fail for aligners other than STAR
def _merge_suffix(aligner):
    align_config = config['bio.ngs.align.' + aligner]
    if aligner == "star":
        return ".Aligned.out_unique.bam"

    
# FIXME: currently only checking in the case of rsem; only necessary case?
def _merge_tx_suffix(aligner):
    align_config = config['bio.ngs.align.' + aligner]
    tx_string = "" if config['bio.ngs.rnaseq.rsem']['index_is_transcriptome'] else ".toTranscriptome"
    if aligner == "star":
        return ".Aligned{tx}.out_unique.bam".format(tx=tx_string)


def _find_transcript_bam(wildcards):
    """Find bam files from transcript output"""
    tgt = IOTarget(config['settings']['sample_organization'].run_id_re.file,
                   suffix=_merge_tx_suffix(config['bio.ngs.settings']['aligner']))
    m = config['settings']['sample_organization'].sample_re.match(wildcards.prefix)
    return [src for src in make_targets(tgt_re=tgt, samples=_samples) if dirname(src).startswith(m.groupdict()['SM'])]

    
def find_scrnaseq_merge_inputs(wildcards):
    """Find platform unit specific aligned bam files as input to picard
    merge. 

    NB: these are *not* the transcript-specific alignment files.
    """
    tgt = IOTarget(config['settings']['sample_organization'].run_id_re.file,
                   suffix=_merge_suffix(config['bio.ngs.settings']['aligner']))
    m = config['settings']['sample_organization'].sample_re.match(wildcards.prefix)
    return [src for src in make_targets(tgt_re=tgt, samples=_samples) if dirname(src).startswith(m.groupdict()['SM'])]


# Configuration
config_default = {
    'settings' : {
        'temporary_rules': [],
        'protected_rules': [],
    },
    'scrnaseq.workflow' : {
        'qc' : {
            # Add parameters here
        },
        'db' : {
            'do_multo' : False,  ## Set to True to run generate multo database
        },
        'pca' : {
            'type': 'sparsePCA',
        },
        'metadata' : None, ## Sample metadata
        'report' : {
            'directory' : 'report',
            'annotation_url' : None,
        },
        'aggregate_output_dir': 'aggregated_results',
        'quantification': ['rpkmforgenes', 'rsem']
    },
    'bio.ngs.settings' : {
        # Should be default for scrnaseq?
        'aligner' : 'star',
    },
    'bio.ngs.qc.picard' : {
        'merge_sam' : {
            'label' : 'merge',
            'inputfun' : find_scrnaseq_merge_inputs,
        },
    },
    'bio.ngs.qc.rseqc' : {
        'rules' : ['rseqc_qc'],
    },
    'bio.ngs.rnaseq.rpkmforgenes' : {
        'rules' : ['rpkmforgenes_from_bam'],
    },
    'bio.ngs.rnaseq.rsem' : {
        'rules' : ['rsem_calculate_expression', 'rsem_prepare_reference'],

    },
    'bio.ngs.align.star' : {
        'rules' : ['star_align', 'star_align_se', 'star_index', 'star_align_log']
    },
    'comp.settings': {
        'python2': {
            'activate_cmd': "",
        },
    },
}

update_config(config_default, config)
config = config_default

aligner = config['bio.ngs.settings']['aligner']

# Include necessary snakemakelib rules
include: join(SNAKEMAKE_RULES_PATH, 'settings.rules')
include: join(SNAKEMAKE_RULES_PATH, 'utils.rules')
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/rnaseq", "rsem.rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/rnaseq", "rpkmforgenes.rules")
align_include = join(SNAKEMAKE_RULES_PATH, "bio/ngs/align", aligner + ".rules")
include: align_include
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/tools", "bamtools.rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/qc", "rseqc.rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/qc", "picard.rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/tools", "samtools.rules")

if aligner in ["bowtie", "bowtie2"]:
    ruleorder: bamtools_filter_unique > picard_merge_sam > picard_sort_bam > bowtie_align

if config['scrnaseq.workflow']['db']['do_multo']:
    include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/tools", "multo.rules")
    
if workflow._workdir is None:
    raise Exception("no workdir set, or set after include of 'scrnaseq.workflow'; set workdir before include statement!")

# Set temporary and protected outputs
set_temporary_output(*[workflow.get_rule(x) for x in config['settings']['temporary_rules']])
set_protected_output(*[workflow.get_rule(x) for x in config['settings']['protected_rules']])


##################################################
# Target definitions and applications
##################################################
REPORT=config['scrnaseq.workflow']['report']['directory']
REPORT_TARGETS = ['{report}/scrnaseq_summary.html'.format(report=REPORT)]

# Platform unit applications
run_id_re = config['settings']['sample_organization'].run_id_re
Star = PlatformUnitApplication(
    name=aligner,
    iotargets={
        'bam': (IOTarget(run_id_re.file, suffix=".Aligned.out.bam"),
                None),
        'log': (IOTarget(run_id_re.file, suffix=".Log.final.out"),
                IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], aligner + '.log'))),
        'unique': (IOTarget(run_id_re.file, suffix=".Aligned.out.bam".replace(".bam", "_unique.bam")),
                   None)},
    units=_samples
)
Star.register_post_processing_hook('log')(scrnaseq_star_align_postprocessing_hook)

# Set Align to Star for now
Align = Star

# Sample applications
sample_re = config['settings']['sample_organization'].sample_re
RSeQC = SampleApplication(
    name="RSeQC",
    iotargets={
        'txt': (IOTarget(sample_re.file, suffix=".merge_rseqc/rseqc_qc.txt"),
                None),
    },
    units=_samples
    )


RSeQC_geneBodyCoverage = SampleApplication(
    name="rseqc_geneBody_coverage",
    iotargets={
        'txt': (IOTarget(sample_re.file, suffix=".merge_rseqc/geneBody_coverage.geneBodyCoverage.txt"),
                IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'rseqc_geneBody_coverage.csv'))),
    },
    units=_samples,
    run = config['bio.ngs.qc.rseqc']['rseqc_qc']['rseqc_geneBody_coverage']
    )
RSeQC_geneBodyCoverage.register_post_processing_hook('txt')(scrnaseq_rseqc_genebody_coverage_hook)


RSeQC_readDistribution = SampleApplication(
    name="rseqc_read_distribution",
    iotargets={
        'txt': (IOTarget(sample_re.file, suffix=".merge_rseqc/read_distribution.txt"),
                IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'rseqc_read_distribution.csv'))),
    },
    units=_samples,
    run = config['bio.ngs.qc.rseqc']['rseqc_qc']['rseqc_read_distribution']
    )
RSeQC_readDistribution.register_post_processing_hook('txt')(scrnaseq_rseqc_read_distribution_hook)


rpkmforgenes = SampleApplication(
    name="rpkmforgenes",
    iotargets={
        'rpkmforgenes': (IOTarget(sample_re.file, suffix=".merge.rpkmforgenes"),
                         IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'rpkmforgenes.csv'))),
        'pca': (IOTarget(join(config['scrnaseq.workflow']['report']['directory'], 'rpkmforgenes.pca.csv')),
                None),
    },
    units=_samples,
    run = True if 'rpkmforgenes' in config['scrnaseq.workflow']['quantification'] else False
    )


tx = "" if config['bio.ngs.rnaseq.rsem']['index_is_transcriptome'] else ".tx"
rsem = SampleApplication(
    name="rsem",
    iotargets={
        'genes': (IOTarget(sample_re.file, suffix='.merge{tx}.genes.results'.format(tx=tx)),
                IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'rsem.genes.csv'))),
        'isoforms': (IOTarget(sample_re.file, suffix='.merge{tx}.isoforms.results'.format(tx=tx)),
                     IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'rsem.isoforms.csv'))),
        'pca': (IOTarget(join(config['scrnaseq.workflow']['report']['directory'], 'rsem.genes.pca.csv')),
                None),
    },
    units=_samples,
    run = True if 'rsem' in config['scrnaseq.workflow']['quantification'] else False
    )
rsem.register_aggregate_post_processing_hook('genes')(scrnaseq_annotate_genes_hook)
rpkmforgenes.register_aggregate_post_processing_hook('rpkmforgenes')(scrnaseq_annotate_genes_hook)
rsem.register_aggregate_post_processing_hook('isoforms')(scrnaseq_annotate_isoforms_hook)


# Results class - composite results
results = SampleApplication(
    name="results",
    iotargets={
        'alignrseqc': (None,
                       IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'align_rseqc.csv'))),
    },
)
results.register_plot('alignrseqc')(scrnaseq_results_plot_alignrseqc)

##################################################
# Rules
##################################################

# Additional merge rule for transcript alignment files
rule scrnaseq_picard_merge_sam_transcript:
    """scrnaseq picard: merge sam files from transcript alignments.

    NB: always outputs bam files!
    """
    params: cmd = config['bio.ngs.qc.picard']['cmd'] + "MergeSamFiles",
            options = " ".join([config['bio.ngs.qc.picard']['options'],
                                config['bio.ngs.qc.picard']['merge_sam']['options']])
    input: _find_transcript_bam
    output: merge="{prefix}.merge.tx.bam"
    run: 
      if (len(input) > 1):
          inputstr = " ".join(["INPUT={}".format(x) for x in input])
          shell("{cmd} {ips} OUTPUT={out} {opt}".format(cmd=params.cmd, ips=inputstr, out=output.merge, opt=params.options))
      else:
          if exists(output.merge):
              os.unlink(output.merge)
          shutil.copy(input[0], output.merge)


##############################
## Workflow rules
##############################
rule scrnaseq_all:
    """Run scRNAseq pipeline"""
    input: Align.targets['unique'] + RSeQC.targets['txt'] + rpkmforgenes.targets['rpkmforgenes'] + rsem.targets['genes'] + REPORT_TARGETS

rule scrnaseq_align:
    """Run alignments"""
    input: Align.targets['bam']

rule scrnaseq_unique:
    """Generate uniquely mapping output"""
    input: Align.targets['unique']

rule scrnaseq_rseqc:
    """Run RSeQC"""
    input: RSeQC.targets['txt']

rule scrnaseq_rpkmforgenes:
    """Run rpkmforgenes"""
    input: rpkmforgenes.targets['rpkmforgenes']

rule scrnaseq_rsem:
    """Run rsem"""
    input: rsem.targets['genes']


# Aggregation
rule scrnaseq_aggregate_align:
    input: Align.targets['log']
    output: Align.aggregate_targets['log']
    run:
        Align.aggregate().save_aggregate_data()

rule scrnaseq_aggregate_rseqc_read_distribution:
    input: RSeQC_readDistribution.targets['txt']
    output: RSeQC_readDistribution.aggregate_targets['txt']
    run:
        RSeQC_readDistribution.aggregate().save_aggregate_data()

rule scrnaseq_aggregate_rseqc_genebody_coverage:
    input: RSeQC_geneBodyCoverage.targets['txt']
    output: RSeQC_geneBodyCoverage.aggregate_targets['txt']
    run:
        RSeQC_geneBodyCoverage.aggregate().save_aggregate_data()

rule scrnaseq_aggregate_rsem:
    input: genes = rsem.targets['genes'],
           isoforms = rsem.targets['isoforms']
    output: genes = rsem.aggregate_targets['genes'],
            isoforms = rsem.aggregate_targets['isoforms']
    run:
        ids = get_extra_ref_ids(config['bio.ngs.settings']['db']['extra_ref'])
        rsem.aggregate(annotation=config['bio.ngs.settings']['annotation']['transcript_annot_gtf'],
                       spikeins=ids).save_aggregate_data()

rule scrnaseq_aggregate_rpkmforgenes:
    input: rpkmforgenes = rpkmforgenes.targets['rpkmforgenes']
    output: rpkmforgenes = rpkmforgenes.aggregate_targets['rpkmforgenes']
    run:
        ids = get_extra_ref_ids(config['bio.ngs.settings']['db']['extra_ref'])
        rpkmforgenes.aggregate(annotation=config['bio.ngs.settings']['annotation']['transcript_annot_gtf'],
                               spikeins=ids).save_aggregate_data()


rule scrnaseq_aggregate_data:
    input: Align.aggregate_targets['log'],
           RSeQC_readDistribution.aggregate_targets['txt'],
           RSeQC_geneBodyCoverage.aggregate_targets['txt'],
           rsem.aggregate_targets['genes'],
           rpkmforgenes.aggregate_targets['rpkmforgenes']

##############################
# pca rule
##############################
rule scrnaseq_pca:
    """Run regular PCA and ad hoc feature selection on data.
    """
    input: expr = join(config['scrnaseq.workflow']['aggregate_output_dir'], "{prefix}.csv")
    output: pca = join("{path}", "{prefix}.pca.csv"),
            pcaobj = join("{path}", "{prefix}.pcaobj.pickle")
    run:
        scrnaseq_pca_all(input.expr, output.pca, output.pcaobj, 
                         metadata=config['scrnaseq.workflow']['metadata'],
                         samples=config['samples'])

        
rule scrnaseq_sparse_pca:
    """Run sparse PCA and feature selection on data.

    Note that this procedure should really be subjected to cross
    validation in order to select the regularization tuning parameter.

    See Witten and Tibshirani (2011) and an article by Witten in
    Statistical Analysis of Next Generation Sequencing Data (2014) for
    a discussion on feature selection.

    """
    input: expr = "{prefix}.csv"
    output: pca = "{prefix}.sparsepca.csv",
            pcaobj = "{prefix}.sparsepcaobj.pickle"
    run:
        scrnaseq_pca_all(input.expr, output.pca, output.pcaobj, 
                         metadata=config['scrnaseq.workflow']['metadata'],
                         method="sparsePCA",
                         samples=config['samples'])


##############################
# Rule to combine Align and RSeQC data
##############################
rule save_align_rseqc_data:
    """Save joint alignment and rseqc data"""
    input: align_log = Align.targets['log'],
           rseqc_read_distribution = RSeQC_readDistribution.targets['txt'],
           rseqc_gene_body_coverage = RSeQC_geneBodyCoverage.targets['txt']
    output: csv = results.aggregate_targets['alignrseqc']
    run:
        scrnaseq_save_align_rseqc_metrics(config, output, Align, RSeQC_readDistribution, RSeQC_geneBodyCoverage)


##############################
# QC - create html report
##############################
rule scrnaseq_qc:
    """Create qc html report"""
    input: alignrseqc = results.aggregate_targets['alignrseqc'],
           rsem = rsem.targets['pca'],
           rpkmforgenes = rpkmforgenes.targets['pca'],
           rulegraph = join(REPORT, "scrnaseq_all_rulegraph.png"),
           globalconf = join(REPORT, "smlconf_global.yaml")
    output: html = join(REPORT, "scrnaseq_summary.html")
    run:
        scrnaseq_qc(config, input, output, results=results, rsem=rsem, rpkmforgenes=rpkmforgenes)

# Misc rules
rule scrnaseq_targets:
    """Print targets """
    run:
        print (Align.targets['bam'])
        print (rseqc.targets['txt'])
        print (rpkmforgenes.targets['rpkmforgenes'])
        print (rsem.targets['genes'])

rule scrnaseq_clean:
    """Clean working directory. WARNING: will remove all files except
    (.fastq|.fastq.gz) and csv files
    """
    params: d = workflow._workdir
    shell: 'for f in `find  {params.d} -type f -name "*" | grep -v ".fastq$" | grep -v ".fastq.gz$" | grep -v ".csv$"`; do echo removing $f; rm -f $f; done'


