# -*- snakemake -*-
from os.path import join
import pysam
from snakemake.utils import update_config, set_temporary_output, set_protected_output
from snakemake_rules import SNAKEMAKE_RULES_PATH
from snakemakelib.targets import make_targets
from snakemakelib.sample.input import initialize_input
from snakemakelib_workflows.atacseq import set_protected_output_by_extension, atacseq_summary

# Should be done first of all
config["_samples"] = initialize_input(src_re = config['bio.ngs.settings']['sampleorg'].raw_run_re,
                                      sampleinfo = config['settings'].get('sampleinfo', None),
                                      filter_suffix = config['bio.ngs.settings'].get("filter_suffix", ""),
                                      sample_column_map = config['bio.ngs.settings'].get("sample_column_map", ""))

##############################
# Functions
##############################
def _merge_suffix():
    """Determine the merge suffix of the run files"""
    if config['workflows.bio.atacseq']['trimadaptor']:
        return ".trimmed.sort.bam"
    else:
        return ".sort.bam"

def _atacseq_picard_merge_sam_input_fn(wildcards):
    sources = make_targets(tgt_re = config['settings']['sample_organization'].run_id_re,
                           samples = _samples,
                           target_suffix = config['bio.ngs.qc.picard']['merge_sam']['suffix'])
    m = config['settings']['sample_organization'].sample_re.parse(wildcards.prefix)
    sources = [src for src in sources if os.path.dirname(src).startswith(m['PATH'])]
    return sources


##############################
# Default configuration settings custom-tailored for ATAC-Seq analysis
##############################
atac_config = {
    'atacseq.workflow' : {
        'aligner' : 'bowtie2',
        'peakcallers' : ['dfilter', 'macs2'],
        'trimadaptor' : True,
        'bamfilter' : True,
    },
    'settings' : {
        'temporary_rules' : [],
        'protected_rules' : [],
    },
    'bio.ngs.qc.picard' : {
        'merge_sam' : {
            'label': 'sort.merge',
            'suffix' : '.sort.bam',
            'inputfun': _atacseq_picard_merge_sam_input_fn,
        },
        'qcrules' : ['picard_collect_insert_size_metrics',
                     'picard_mark_duplicates'],
    },
    'bio.ngs.enrichment.macs' : {
        'callpeak' : {
            'options' : '-g hs --nomodel --nolambda --keep-dup all --call-summits -B',
        },
    },
    'bio.ngs.tools.bamtools' : {
        'filter' : {
            'options' : {'mapQuality': ">=30",
                         'isProperPair': 'true'},
        },
    },
    'bio.ngs.qc.cutadapt' : {
        'rules' : ['cutadapt_cut_paired_end'] # , 'cutadapt_qc_summary'],
    },
    'bio.ngs.db.ucsc' : {
        'rules' : ['ucsc_wigToBigWig', 'ucsc_bedGraphToBigWig', 'ucsc_fetchChromSizes'],
    },
}
aligner_config = {
    'bio.ngs.align.bowtie' : {
        'align' : {
            'options' : '-X 2000',
        },
    },
    'bio.ngs.align.bowtie2' : {
        'align' : {
            'options' : '-X 2000',
        },
    },
    'bio.ngs.align.bwa' : {
    },
}

update_config(atac_config, config)
config = atac_config

ALIGN_TARGET_SUFFIX = ".bam"
if config['atacseq.workflow']['trimadaptor']:
    config['bio.ngs.qc.picard']['merge_sam']['suffix'] = '.trimmed.sort.bam'
    ALIGN_TARGET_SUFFIX = ".trimmed.bam"

aligner = config['atacseq.workflow']['aligner']
key = 'bio.ngs.align.' + aligner

config_default = aligner_config[key]
update_config(config_default, config)
config = config_default

##############################
# Include statements
##############################
include: join(SNAKEMAKE_RULES_PATH, 'settings.rules')
include: join(SNAKEMAKE_RULES_PATH, 'utils.rules')
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs", "settings.rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/align", aligner + ".rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/align", "blat.rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/db", "ucsc.rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/qc", "picard.rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/qc", "qualimap.rules")
include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/chromatin", "danpos.rules")
if 'dfilter' in config['atacseq.workflow']['peakcallers']:
    include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/enrichment", "dfilter.rules")
if 'macs2' in config['atacseq.workflow']['peakcallers']:
    include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/enrichment", "macs2.rules")
if config['atacseq.workflow']['trimadaptor']:
    include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/qc", "cutadapt.rules")
if config['atacseq.workflow']['bamfilter']:
    include: join(SNAKEMAKE_RULES_PATH, "bio/ngs/tools", "bamtools.rules")

    
ruleorder: picard_merge_sam > picard_sort_sam 
ruleorder: picard_sort_sam > picard_add_or_replace_read_groups
ruleorder: picard_add_or_replace_read_groups > picard_mark_duplicates
ruleorder: picard_mark_duplicates > atacseq_correct_coordinates

if workflow._workdir is None:
    raise Exception("no workdir set, or set after include of 'atacseq.workflow'; set workdir before include statement!")

##############################
# Targets
##############################
_samples = config["_samples"]
if not config.get("samples", None)  is None:
    # FIXME: samples should always be strings
    _samples = [s for s in _samples if s["SM"] in config["samples"]]

TRIM_TARGETS = []
if config['atacseq.workflow']['trimadaptor']:
    TRIM_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].run_id_re,
                                samples = _samples,
                                target_suffix = ".cutadapt_metrics")


ALIGN_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].run_id_re,
                             samples = _samples,
                             target_suffix = ALIGN_TARGET_SUFFIX)

MERGE_TARGET_SUFFIX = ".sort.merge.bam"
MERGE_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].run_id_re,
                             samples = _samples,
                             target_suffix = MERGE_TARGET_SUFFIX)

QUALIMAP_TARGETS = []
QUALIMAP_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].sample_re,
                                samples = _samples,
                                target_suffix = MERGE_TARGET_SUFFIX + ".qualimap" + os.sep + 'genome_results.txt')

PREFIX = ".sort.merge.filter" if config['atacseq.workflow']['bamfilter'] else ".sort.merge"

DFILTER_TARGET_SUFFIX = PREFIX + ".offset.dfilt.bed"
DFILTER_TARGETS = []
if 'dfilter' in config['atacseq.workflow']['peakcallers']:
    DFILTER_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].sample_re,
                                   target_suffix = DFILTER_TARGET_SUFFIX,
                                   samples = _samples)

MACS2_TARGET_SUFFIX = PREFIX + ".offset_peaks.xls"
MACS2_TARGETS = []
if 'macs2' in config['atacseq.workflow']['peakcallers']:
    MACS2_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].sample_re, 
                                 target_suffix = MACS2_TARGET_SUFFIX,
                                 samples = _samples)
                                 
DUP_METRICS_SUFFIX = ".sort.merge.dup.dup_metrics"
DUP_METRICS_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].sample_re, 
                                   target_suffix =  DUP_METRICS_SUFFIX,
                                   samples = _samples)

ALIGN_METRICS_SUFFIX = ".sort.merge.dup.align_metrics"
ALIGN_METRICS_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].sample_re, 
                                     target_suffix =  ALIGN_METRICS_SUFFIX, 
                                     samples = _samples)

INSERT_METRICS_SUFFIX = ".sort.merge.dup.insert_metrics"
INSERT_METRICS_TARGETS = make_targets(tgt_re = config['settings']['sample_organization'].sample_re, 
                                      target_suffix =  INSERT_METRICS_SUFFIX,
                                      samples = _samples)

REPORT_TARGETS = ["report/atacseq_all_rulegraph.png", "report/atacseq_summary.html"]

BIGWIG_TARGETS = [x.replace(".bed", ".bed.wig.bw") for x in DFILTER_TARGETS] +\
                 [x.replace("_peaks.xls", "_treat_pileup.bdg.bw") for x in MACS2_TARGETS] +\
                 [x.replace("_peaks.xls", "_control_lambda.bdg.bw") for x in MACS2_TARGETS]

# ##############################
# # Collection rules
# ##############################
rule atacseq_all:
    """Run ATAC-seq pipeline"""
    input: DFILTER_TARGETS + MACS2_TARGETS + DUP_METRICS_TARGETS + ALIGN_METRICS_TARGETS + INSERT_METRICS_TARGETS + REPORT_TARGETS

rule atacseq_align:
    """Run ATAC-seq alignment"""
    input: ALIGN_TARGETS

rule atacseq_merge:
    """Run ATAC-seq alignment, duplication removal and merge"""
    input: MERGE_TARGETS

rule atacseq_metrics:
    """Run ATAC-seq alignment and corresponding metrics only"""
    input: DUP_METRICS_TARGETS + ALIGN_METRICS_TARGETS + INSERT_METRICS_TARGETS

rule atacseq_bigwig:
    """Convert peak-calling bed output to bigwig"""
    input: BIGWIG_TARGETS


##############################
# Specific rules
##############################    
rule atacseq_correct_coordinates:
    """From Buenrostro paper: 

    'Previous descriptions of the Tn5 transposase show that the
    transposon binds as a dimer and inserts two adaptors separated by
    9 bp (ref. 11). Therefore, all reads aligning to the + strand were
    offset by +4 bp, and all reads aligning to the – strand were
    offset −5 bp'
    """
    input: bam = "{prefix}.bam"
    output: bam = "{prefix}.offset.bam"
    run:
        # Use pysam to modify input
        samfile = pysam.AlignmentFile(input.bam, "rb")
        outfile = pysam.AlignmentFile(output.bam, "wb", template=samfile)
        for s in samfile:
            # Modify s here
            if not s.is_unmapped:
                l = samfile.lengths[s.rname]
                if not s.is_reverse:
                    s.pos = min(l, s.pos + 4)
                    s.pnext = max(0, s.pnext - 5)
                else:
                    s.pos = max(0, s.pos - 5)
                    s.pnext = min(l, s.pnext + 4)
            outfile.write(s)

rule atacseq_report:
    """Write report"""
    input: cutadapt = TRIM_TARGETS if config['atacseq.workflow']['trimadaptor'] else [],
           qualimap = QUALIMAP_TARGETS,
           align_metrics = ALIGN_METRICS_TARGETS,
           insert_metrics = INSERT_METRICS_TARGETS,
           dup_metrics = DUP_METRICS_TARGETS,
           rulegraph = "report/atacseq_all_rulegraph.png"
    output: html = join("{path}", "atacseq_summary.html")
    run:
        atacseq_summary(config, input, output)


# Set temporary and protected outputs
set_temporary_output(*[workflow.get_rule(x) for x in config['settings']['temporary_rules']])
set_protected_output(*[workflow.get_rule(x) for x in config['settings']['protected_rules']])
set_protected_output_by_extension(*[workflow.get_rule(x) for x in config['settings']['temporary_rules']],
                                  re_extension = re.compile("(.align_metrics$|.dup_metrics$|.insert_metrics$)"))


#
# Putative additional data and methods
#
# Section ATAC-seq insertion size enrichment analysis
# No Segmentation data available for current ensembl build ?!? Use old data:
# ftp://ftp.ensembl.org/pub/release-73/regulation/homo_sapiens/Segmentation_GM12878.gff.gz
#
# Section Nucleosome positioning
# Danpos, Dantools: https://sites.google.com/site/danposdoc/
# 
# Section ChIP-seq peak-calling and clustering
# ChIP data for 50 antibodies downloaded from
# Stanford/Yale/USC/Harvard (SYDH) ENCODE data repository available at the UCSC genome browser:
# http://hgdownload.cse.ucsc.edu/goldenPath/hg19/encodeDCC/wgEncodeSydhTfbs/
# 
# Section Footprinting using CENTIPEDE

# Use motif data from http://compbio.mit.edu/encode-motifs/; most
# likely need matches.txt.gz to find genomic regions matching a motif;
# the genome-wide set of motifs is in motifs.txt (?).

# Other papers
# http://journals.plos.org/plosgenetics/article?id=10.1371/journal.pgen.1004994
# use macs2 with -g dm –nomodel –shiftsize 50 –q 0.01; however single-end 50bp reads

