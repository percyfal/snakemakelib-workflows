# -*- snakemake -*-
from os.path import join, dirname
import pysam
import pandas as pd
from snakemake.utils import update_config, set_temporary_output, set_protected_output
from snakemake_rules import SNAKEMAKE_RULES_PATH
from snakemakelib.targets import make_targets
from snakemakelib.sample.input import initialize_input
from snakemakelib.application import SampleApplication, PlatformUnitApplication
from snakemakelib.io import IOTarget, IOAggregateTarget
from snakemakelib_workflows.atacseq.app import *

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
    """Picard merge sam input function.

    """
    tgt = IOTarget(config['settings']['sample_organization'].run_id_re.file, suffix=config['bio.ngs.qc.picard']['merge_sam']['suffix'])
    m = config['settings']['sample_organization'].sample_re.match(wildcards.prefix)
    l = [x for x in _samples if x['SM'] == m.groupdict()['SM']]
    return make_targets(tgt_re=tgt, samples=l)


##############################
# Default configuration settings custom-tailored for ATAC-Seq analysis
##############################
atac_config = {
    'atacseq.workflow' : {
        'aligner' : 'bowtie2',
        'peakcallers' : ['macs2'],
        'trimadaptor' : True,
        'bamfilter' : True,
        'aggregate_output_dir': 'aggregated_results',
        'report_output_dir': 'report',
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
# Collect information about inputs; _samples stores a list of
# dictionaries, where each dictionary contains information on a sample
if config.get('settings', {}).get('sample_organization', None) is None:
    from snakemakelib.sample.organization import sample
config["_samples"] = initialize_input(src_re = config['settings']['sample_organization'].raw_run_re,
                                      sampleinfo = config['settings'].get('sampleinfo', None),
                                      filter_suffix = config['bio.ngs.settings'].get("filter_suffix", ""),
                                      sample_column_map = config['bio.ngs.settings'].get("sample_column_map", ""))


_samples = config["_samples"]
if not config.get("samples", None)  is None:
    _samples = [s for s in _samples if s["SM"] in config["samples"]]


##############################
# Applications
##############################
# Platform run id level targets
run_id_re = config['settings']['sample_organization'].run_id_re
Cutadapt = PlatformUnitApplication(
    name="cutadapt",
    iotargets={
        'cutadapt':(IOTarget(run_id_re.file, suffix=".cutadapt_metrics"),
                    IOAggregateTarget(os.path.join(config['atacseq.workflow']['aggregate_output_dir'], "cutadapt.metrics")))},
    units=_samples,
    run=config['atacseq.workflow']['trimadaptor']
)

Cutadapt.register_post_processing_hook('cutadapt')(atacseq_cutadapt_post_processing_hook)
Cutadapt.register_plot('cutadapt')(atacseq_cutadapt_plot_metrics)
    
Align = PlatformUnitApplication(
    name=aligner,
    iotargets={
        'bam': (IOTarget(run_id_re.file, suffix=ALIGN_TARGET_SUFFIX),
                None)},
    units=_samples
)


# Sample level targets
sample_re=config['settings']['sample_organization'].sample_re
MERGE_TARGET_SUFFIX = ".sort.merge.bam"
Merge = SampleApplication(
    name="PicardMergeSam",
    iotargets={
        'bam': (IOTarget(sample_re.file, suffix=MERGE_TARGET_SUFFIX),
                None)},
    units=_samples
)


Qualimap = SampleApplication(
    name="Qualimap",
    iotargets={
        'Globals': (IOTarget(sample_re.file, suffix=MERGE_TARGET_SUFFIX + ".qualimap" + os.sep + 'genome_results.txt'),
                    IOAggregateTarget(os.path.join(config['atacseq.workflow']['aggregate_output_dir'], "qualimap.globals.csv"))),
        'Coverage_per_contig' : (IOTarget(sample_re.file, suffix=MERGE_TARGET_SUFFIX + ".qualimap" + os.sep + 'genome_results.txt'),
                                 IOAggregateTarget(os.path.join(config['atacseq.workflow']['aggregate_output_dir'], "qualimap.coverage_per_contig.csv"))),
    },
    units=_samples
)

Qualimap.register_post_processing_hook('Globals')(atacseq_qualimap_globals_post_processing_hook)
Qualimap.register_post_processing_hook('Coverage_per_contig')(atacseq_qualimap_coverage_per_contig_post_processing_hook)
Qualimap.register_plot('Globals')(atacseq_qualimap_plot_globals)
Qualimap.register_plot('Coverage_per_contig')(atacseq_qualimap_plot_coverage_per_contig)


MarkDuplicates = SampleApplication(
    name="MarkDuplicates",
    iotargets={
        'metrics': (IOTarget(sample_re.file, suffix=".sort.merge.dup.dup_metrics"),
                        IOAggregateTarget(os.path.join(config['atacseq.workflow']['aggregate_output_dir'], "MarkDuplicates.metrics"))),
        'hist': (IOTarget(sample_re.file, suffix=".sort.merge.dup.dup_metrics"),
                             IOAggregateTarget(os.path.join(config['atacseq.workflow']['aggregate_output_dir'], "MarkDuplicates.hist"))),
    },
    units=_samples,
)

MarkDuplicates.register_plot('metrics')(atacseq_mark_duplicates_plot)
MarkDuplicates.register_plot('hist')(atacseq_mark_duplicates_hist_plot)


AlignmentMetrics = SampleApplication(
    name="AlignmentMetrics",
    iotargets={
        'metrics': (IOTarget(sample_re.file, suffix=".sort.merge.dup.align_metrics"),
                    IOAggregateTarget(os.path.join(config['atacseq.workflow']['aggregate_output_dir'], "AlignMetrics.metrics")))},
    units=_samples,
)

InsertMetrics = SampleApplication(
    name="InsertMetrics",
    iotargets={
        'metrics': (IOTarget(sample_re.file, suffix=".sort.merge.dup.insert_metrics"),
                           IOAggregateTarget(os.path.join(config['atacseq.workflow']['aggregate_output_dir'], "InsertMetrics.metrics"))),
        'hist': (IOTarget(sample_re.file, suffix=".sort.merge.dup.insert_metrics"),
                                IOAggregateTarget(os.path.join(config['atacseq.workflow']['aggregate_output_dir'], "InsertMetrics.hist")))},
    units=_samples,
)

InsertMetrics.register_plot('metrics')(atacseq_insert_metrics_plot)
InsertMetrics.register_plot('hist')(atacseq_insert_metrics_hist_plot)

####################
# Peak callers
####################
PREFIX = ".sort.merge.filter" if config['atacseq.workflow']['bamfilter'] else ".sort.merge"

Dfilter = SampleApplication(
    name="Dfilter",
    iotargets={
        'bed': (IOTarget(sample_re.file, suffix=PREFIX + ".offset.dfilt.bed"),
                None)},
    units=_samples,
    run=True if 'dfilter' in config['atacseq.workflow']['peakcallers'] else False,
)

Macs2 = SampleApplication(
    name="MACS2",
    iotargets={
        'xls': (IOTarget(sample_re.file, suffix=PREFIX + ".offset_peaks.xls"),
                None)},
    units=_samples,
    run=True if 'macs2' in config['atacseq.workflow']['peakcallers'] else False,
)



# Misc targets
REPORT_TARGETS = [join(config['atacseq.workflow']['report_output_dir'], "atacseq_all_rulegraph.png"),
                  join(config['atacseq.workflow']['report_output_dir'], "atacseq_summary.html")]

BIGWIG_TARGETS = [x.replace(".bed", ".bed.wig.bw") for x in Dfilter.targets['bed']] +\
                 [x.replace("_peaks.xls", "_treat_pileup.bdg.bw") for x in Macs2.targets['xls']] +\
                 [x.replace("_peaks.xls", "_control_lambda.bdg.bw") for x in Macs2.targets['xls']]

##############################
# Collection rules
##############################
rule atacseq_all:
    """Run ATAC-seq pipeline"""
    input: Dfilter.targets['bed'] + Macs2.targets['xls'] + MarkDuplicates.targets['metrics'] + MarkDuplicates.targets['hist'] + AlignmentMetrics.targets['metrics'] + InsertMetrics.targets['metrics'] + InsertMetrics.targets['hist'] + REPORT_TARGETS

rule atacseq_align:
    """Run ATAC-seq alignment"""
    input: Align.targets['bam']

rule atacseq_merge:
    """Run ATAC-seq alignment, duplication removal and merge"""
    input: Merge.targets['bam']

rule atacseq_metrics:
    """Run ATAC-seq alignment and corresponding metrics only"""
    input: MarkDuplicates.targets['metrics'] + AlignmentMetrics.targets['metrics'] + InsertMetrics.targets['metrics'] + MarkDuplicates.targets['hist'] + InsertMetrics.targets['hist']

rule atacseq_bigwig:
    """Convert peak-calling bed output to bigwig"""
    input: BIGWIG_TARGETS


rule atacseq_aggregate_cutadapt_results:
    input: cutadapt = Cutadapt.targets['cutadapt']
    output: cutadapt = Cutadapt.aggregate_targets['cutadapt']
    run:
        aggregate_results(Cutadapt)

rule atacseq_aggregate_qualimap_results:
    input: qualimap = Qualimap.targets['Globals']
    output: qualimap_globals = Qualimap.aggregate_targets['Globals'],
            qualimap_coverage_per_contig = Qualimap.aggregate_targets['Coverage_per_contig'],
    run:
        aggregate_results(Qualimap)

rule atacseq_aggregate_picard_results:
    input: markduplicates = MarkDuplicates.targets['metrics'],
           alignmetrics = AlignmentMetrics.targets['metrics'],
           insertmetrics = InsertMetrics.targets['metrics']
    output: dup_metrics = MarkDuplicates.aggregate_targets['metrics'],
            dup_metrics_hist = MarkDuplicates.aggregate_targets['hist'],
            insert_metrics = InsertMetrics.aggregate_targets['metrics'],
            insert_metrics_hist = InsertMetrics.aggregate_targets['hist'],
            align_metrics = AlignmentMetrics.aggregate_targets['metrics']
    run:
        aggregate_results(AlignmentMetrics)
        aggregate_results(MarkDuplicates)
        aggregate_results(InsertMetrics)

        
rule atacseq_aggregate_results:
    """Aggregate application results, pseudo-rule"""
    input: cutadapt = Cutadapt.aggregate_targets['cutadapt'],
            qualimap_globals = Qualimap.aggregate_targets['Globals'],
            qualimap_coverage_per_contig = Qualimap.aggregate_targets['Coverage_per_contig'],
            dup_metrics = MarkDuplicates.aggregate_targets['metrics'],
            dup_metrics_hist = MarkDuplicates.aggregate_targets['hist'],
            insert_metrics = InsertMetrics.aggregate_targets['metrics'],
            insert_metrics_hist = InsertMetrics.aggregate_targets['hist'],
            align_metrics = AlignmentMetrics.aggregate_targets['metrics']
        

rule atacseq_report:
    """Write report"""
    input: cutadapt = Cutadapt.aggregate_targets['cutadapt'],
           qualimap_globals = Qualimap.aggregate_targets['Globals'],
           qualimap_coverage_per_contig = Qualimap.aggregate_targets['Coverage_per_contig'],
           dup_metrics = MarkDuplicates.aggregate_targets['metrics'],
           dup_metrics_hist = MarkDuplicates.aggregate_targets['hist'],
           insert_metrics = InsertMetrics.aggregate_targets['metrics'],
           insert_metrics_hist = InsertMetrics.aggregate_targets['hist'],
           align_metrics = AlignmentMetrics.aggregate_targets['metrics'],
           rulegraph = join(config['atacseq.workflow']['report_output_dir'], "atacseq_all_rulegraph.png")
    output: html = join(config['atacseq.workflow']['report_output_dir'], "atacseq_summary.html")
    run:
        atacseq_summary(config, input, output, Cutadapt, Qualimap,
                        MarkDuplicates, InsertMetrics, AlignmentMetrics)



##############################
# Workflow-specific rules
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

    
# Set temporary and protected outputs
set_temporary_output(*[workflow.get_rule(x) for x in config['settings']['temporary_rules']])
set_protected_output(*[workflow.get_rule(x) for x in config['settings']['protected_rules']])
# set_protected_output_by_extension(*[workflow.get_rule(x) for x in config['settings']['temporary_rules']],
#                                   re_extension = re.compile("(.align_metrics$|.dup_metrics$|.insert_metrics$)"))


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

