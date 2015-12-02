# -*- snakemake -*-
import shutil
import os
import math
from os.path import join, dirname, relpath, exists, basename
import pickle
from snakemake.utils import update_config, set_temporary_output, set_protected_output
from snakemake.workflow import workflow
from snakemake_rules import SNAKEMAKE_RULES_PATH
from snakemakelib.io import make_targets
from snakemakelib.sample.input import initialize_input
from snakemakelib_workflows.scrnaseq import *
from snakemakelib.application import SampleApplication, PlatformUnitApplication
from snakemakelib.io import IOTarget, IOAggregateTarget
from snakemakelib.bio.ngs.rnaseq.utils import _gene_name_map_from_gtf

# Collect information about inputs; _samples stores a list of
# dictionaries, where each dictionary contains information on a sample
config["_samples"] = initialize_input(src_re = config['settings']['sample_organization'].raw_run_re,
                                      sampleinfo = config['settings'].get('sampleinfo', None),
                                      metadata = config['settings'].get('metadata', None),
                                      metadata_filter = config['settings'].get('metadata_filter', None),
                                      filter_suffix = config['bio.ngs.settings'].get("filter_suffix", ""),
                                      sample_column_map = config['bio.ngs.settings'].get("sample_column_map", ""))

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
        'temporary_rules': [], #['star_align', 'bamtools_filter_unique'],
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

# # Set temporary and protected outputs
set_temporary_output(*[workflow.get_rule(x) for x in config['settings']['temporary_rules']])
set_protected_output(*[workflow.get_rule(x) for x in config['settings']['protected_rules']])

##################################################
# Target definitions
##################################################
_samples = config["_samples"]
if not len(config.get("samples", [])) == 0:
    _samples = [s for s in _samples if s["SM"] in config["samples"]]

    
REPORT=config['scrnaseq.workflow']['report']['directory']
REPORT_TARGETS = ['{report}/scrnaseq_summary.html'.format(report=REPORT)]

##############################
# Applications
##############################
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
@Star.register_post_processing_hook('log')
def _star_align_post_processing_hook(df, **kwargs):
    df.loc['mismatch_sum', :] = df.loc['Mismatch rate per base, %',:].copy()
    df.loc['mismatch_sum', "value"] = df.loc['Mismatch rate per base, %', "value"]   + df.loc['Deletion rate per base', "value"] + df.loc['Insertion rate per base', "value"]
    df.loc['% of reads unmapped', :] = df.loc['% of reads unmapped: other', :]
    df.loc['% of reads unmapped', "value"] = df.loc['% of reads unmapped: other', "value"] + df.loc['% of reads unmapped: too many mismatches', "value"] + df.loc['% of reads unmapped: too short', "value"]
    return df

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
@RSeQC_geneBodyCoverage.register_post_processing_hook('txt')
def _rseqc_genebody_coverage_hook(df, **kwargs):
    df['three_prime_map'] = 100.0 * df.loc[:, "91":"100"].sum(axis=1) / df.loc[:, "1":"100"].sum(axis=1)
    return df

RSeQC_readDistribution = SampleApplication(
    name="rseqc_read_distribution",
    iotargets={
        'txt': (IOTarget(sample_re.file, suffix=".merge_rseqc/read_distribution.txt"),
                IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'rseqc_read_distribution.csv'))),
    },
    units=_samples,
    run = config['bio.ngs.qc.rseqc']['rseqc_qc']['rseqc_read_distribution']
    )
@RSeQC_readDistribution.register_post_processing_hook('txt')
def _rseq_read_distribution_hook(df, **kwargs):
    df = df.reset_index().set_index("Group")
    exonmap = df.loc['Introns', :]
    cols = ["Total_bases", "Tag_count", "Tags/Kb"]
    exonmap.loc[cols] = 100 * (df.loc['CDS_Exons', cols] + df.loc["3'UTR_Exons", cols] + df.loc["5'UTR_Exons", cols]) / df.loc[:, cols].sum(axis=0)
    df.loc["ExonMap_%", :] = exonmap
    return df


rpkmforgenes = SampleApplication(
    name="rpkmforgenes",
    iotargets={
        'rpkmforgenes': (IOTarget(sample_re.file, suffix=".merge.rpkmforgenes"),
                         IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'rpkmforgenes.csv'))),
        'pca': (IOTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'rpkmforgenes.pca.csv')),
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
        'pca': (IOTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'rsem.genes.pca.csv')),
                None),
    },
    units=_samples,
    run = True if 'rsem' in config['scrnaseq.workflow']['quantification'] else False
    )
@rsem.register_aggregate_post_processing_hook('genes')
@rpkmforgenes.register_aggregate_post_processing_hook('rpkmforgenes')
def _annotate_genes_hook(df, annotation=config['bio.ngs.settings']['annotation']['transcript_annot_gtf'], **kwargs):
    df.reset_index(inplace=True)
    annot = pd.read_table(annotation, header=None)
    mapping = _gene_name_map_from_gtf(annot, "gene_id", "gene_name")
    df["gene_name"] = df["gene_id"].map(mapping.get)
    return df
@rsem.register_aggregate_post_processing_hook('isoforms')
def _annotate_isoforms_hook(df, annotation=config['bio.ngs.settings']['annotation']['transcript_annot_gtf'], **kwargs):
    df.reset_index(inplace=True)
    annot = pd.read_table(annotation, header=None)
    mapping = _gene_name_map_from_gtf(annot, "transcript_id", "transcript_name")
    df["transcript_name"] = df["transcript_id"].map(mapping.get)
    return df


##############################
# Results class - composite results
##############################
results = SampleApplication(
    name="results",
    iotargets={
        'alignrseqc': (None,
                       IOAggregateTarget(join(config['scrnaseq.workflow']['aggregate_output_dir'], 'align_rseqc.csv'))),
    },
)
results.register_plot('alignrseqc')(_results_plot_alignrseqc)

# Utility rules - these rely on previously defined targets so must be
# placed here; everything up to here in this file is visible to the
# included file
include: "./utils.rules"

# Workflow rules
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
        rsem.aggregate().save_aggregate_data()

rule scrnaseq_aggregate_rpkmforgenes:
    input: rpkmforgenes = rpkmforgenes.targets['rpkmforgenes']
    output: rpkmforgenes = rpkmforgenes.aggregate_targets['rpkmforgenes']
    run:
        rpkmforgenes.aggregate().save_aggregate_data()

    
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


