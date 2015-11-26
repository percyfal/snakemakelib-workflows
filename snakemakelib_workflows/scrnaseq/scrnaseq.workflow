# -*- snakemake -*-
import shutil
import os
import math
from os.path import join, dirname, relpath, exists, basename
import pickle
from snakemake.utils import update_config, set_temporary_output, set_protected_output
from snakemake.workflow import workflow
from snakemake_rules import SNAKEMAKE_RULES_PATH
from snakemakelib.targets import make_targets
from snakemakelib.sample.input import initialize_input
from snakemakelib_workflows.scrnaseq import scrnaseq_qc
from snakemakelib.bio.ngs.rnaseq.utils import read_gene_expression

# Should be done first of all
config["_samples"] = initialize_input(src_re = config['settings']['sample_organization'].raw_run_re,
                                      sampleinfo = config['settings'].get('sampleinfo', None),
                                      metadata = config['settings'].get('metadata', None),
                                      metadata_filter = config['settings'].get('metadata_filter', None),
                                      filter_suffix = config['bio.ngs.settings'].get("filter_suffix", ""),
                                      sample_column_map = config['bio.ngs.settings'].get("sample_column_map", ""))

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
    m = config['settings']['sample_organization'].sample_re.match(wildcards.prefix)
    sources = make_targets(tgt_re=config['settings']['sample_organization'].run_id_re,
                           samples = [s for s in _samples if s["SM"]==m.groupdict()["SM"]],
                           target_suffix = _merge_tx_suffix(config['bio.ngs.settings']['aligner']))
    return sources

def find_scrnaseq_merge_inputs(wildcards):
    """Find platform unit specific aligned bam files as input to picard
    merge. 

    NB: these are *not* the transcript-specific alignment files.
    """
    m = config['settings']['sample_organization'].sample_re.match(wildcards.prefix)
    sources = make_targets(tgt_re = config['settings']['sample_organization'].run_id_re,
                           samples = [s for s in _samples if s["SM"]==m.groupdict()["SM"]],
                           target_suffix = _merge_suffix(config['bio.ngs.settings']['aligner']))
    return sources


# Configuration
config_default = {
    'settings' : {
        'temporary_rules': [], #['star_align', 'bamtools_filter_unique'],
        'protected_rules': [],
    },
    'workflows.bio.scrnaseq' : {
        'qc' : {
            # Add parameters here
        },
        'db' : {
            'do_multo' : False,  ## Set to True to run generate multo database
        },
        'metadata' : None, ## Sample metadata
        'report' : {
            'directory' : 'report',
            'annotation_url' : None,
        },
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

if config['workflows.bio.scrnaseq']['db']['do_multo']:
    include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/tools", "multo.rules")
    
if workflow._workdir is None:
    raise Exception("no workdir set, or set after include of 'scrnaseq.workflow'; set workdir before include statement!")

# # Set temporary and protected outputs
set_temporary_output(*[workflow.get_rule(x) for x in config['settings']['temporary_rules']])
set_protected_output(*[workflow.get_rule(x) for x in config['settings']['protected_rules']])

annotationstring = ".annotated" if config['bio.ngs.settings']['annotation']['transcript_annot_gtf'] else ""
##################################################
# Target definitions
##################################################
_samples = config["_samples"]
if not len(config.get("samples", [])) == 0:
    _samples = [s for s in _samples if s["SM"] in config["samples"]]

REPORT=config['workflows.bio.scrnaseq']['report']['directory']
REPORT_TARGETS = ['{report}/scrnaseq_summary.html'.format(report=REPORT)]

ALIGN_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].run_id_re,
                                samples = _samples,
                                target_suffix = ".Aligned.out.bam")

ALIGN_LOG_TARGETS =  make_targets(tgt_re = config['settings']['sample_organization'].run_id_re,
                                  samples = _samples,
                                  target_suffix = ".Log.final.out")

UNIQUE_TARGETS = [x.replace(".bam", "_unique.bam") for x in ALIGN_TARGETS]

RSEQC_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].sample_re,
                                samples = _samples,
                                target_suffix = '.merge_rseqc/rseqc_qc.txt')
RSEQC_GENE_BODY_COVERAGE = [x.replace("rseqc_qc.txt", "geneBody_coverage.geneBodyCoverage.txt") for x in RSEQC_TARGETS] if config['bio.ngs.qc.rseqc']['rseqc_qc']['rseqc_geneBody_coverage'] else []
RSEQC_READ_DISTRIBUTION = [x.replace("rseqc_qc.txt", "read_distribution.txt") for x in RSEQC_TARGETS] if config['bio.ngs.qc.rseqc']['rseqc_qc']['rseqc_read_distribution'] else []

RPKMFORGENES_TARGETS = []
if 'rpkmforgenes' in config['workflows.bio.scrnaseq']['quantification']:
    RPKMFORGENES_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].sample_re,
                                        samples = _samples,
                                        target_suffix = '.merge.rpkmforgenes')
    REPORT_TARGETS += ['{report}/rpkmforgenes.merge{annot}.csv'.format(report=REPORT, annot=annotationstring)]


RSEM_TARGETS = []
if 'rsem' in config['workflows.bio.scrnaseq']['quantification']:
    print(config['bio.ngs.rnaseq.rsem'])
    tx = "" if config['bio.ngs.rnaseq.rsem']['index_is_transcriptome'] else ".tx"
    RSEM_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].sample_re,
                                samples = _samples,
                                target_suffix = '.merge{tx}.genes.results'.format(tx=tx))
    REPORT_TARGETS += ['{report}/rsem.merge{tx}.genes{annot}.csv'.format(report=REPORT, annot=annotationstring, tx=tx),
                       '{report}/rsem.merge{tx}.isoforms{annot}.csv'.format(report=REPORT, annot=annotationstring, tx=tx)]

# Utility rules - rely on targets so must be placed last
include: "./utils.rules"

# Workflow rules
rule scrnaseq_all:
    """Run scRNAseq pipeline"""
    input: UNIQUE_TARGETS + RSEQC_TARGETS + RPKMFORGENES_TARGETS + RSEM_TARGETS + REPORT_TARGETS

rule scrnaseq_align:
    """Run alignments"""
    input: ALIGN_TARGETS

rule scrnaseq_unique:
    """Generate uniquely mapping output"""
    input: UNIQUE_TARGETS

rule scrnaseq_rseqc:
    """Run RSeQC"""
    input: RSEQC_TARGETS

rule scrnaseq_rpkmforgenes:
    """Run rpkmforgenes"""
    input: RPKMFORGENES_TARGETS

rule scrnaseq_rsem:
    """Run rpkmforgenes"""
    input: RSEM_TARGETS
    
rule scrnaseq_targets:
    """Print targets """
    run:
        print (ALIGN_TARGETS)
        print (RSEQC_TARGETS)
        print (RPKMFORGENES_TARGETS)
        print (RSEM_TARGETS)

rule scrnaseq_clean:
    """Clean working directory. WARNING: will remove all files except
    (.fastq|.fastq.gz) and csv files
    """
    params: d = workflow._workdir
    shell: 'for f in `find  {params.d} -type f -name "*" | grep -v ".fastq$" | grep -v ".fastq.gz$" | grep -v ".csv$"`; do echo removing $f; rm -f $f; done'


