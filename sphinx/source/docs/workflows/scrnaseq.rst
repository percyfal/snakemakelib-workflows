Single cell RNA-seq
--------------------

Required configuration
""""""""""""""""""""""

The following options must be set in the configuration file:

.. code-block:: yaml

   bio.ngs.settings:
     db:
       ref: # Reference sequence
     annotation:
       transcript_annot_gtf: # transcript annotation file in gtf format
   
   samples: # list of sample identifiers

Workflow specific configuration
""""""""""""""""""""""""""""""""

.. code-block:: yaml

   scrnaseq.workflow:
     quantification: # One or both of the following
       - rsem 
       - rpkmforgenes
     metadata: # Tab-delimited or csv file with additional information about the samples
     report:
       annotation_url: # optional link to gene database, e.g. ensembl

       

Other configuration
"""""""""""""""""""""""

`['bio.ngs.settings']['db']['extra_ref']`
  If you have additional reference sequence to include, such as spikeins
  or marker protein sequence, include these in section
  ['bio.ngs.settings']['db']['extra_ref']. This parameter takes a list
  of fasta file names. Since STAR can take multiple input files for
  indexing, the files will not be concatenated.


Additional advice
""""""""""""""""""

There are a couple of helper rules for generating spikein input files
and the transcript annotation file.

`bio.ngs.db.utils.dbutils_make_transcript_annot_gtf`
  For QC statistics calculated by RSEQC, the gtf annotation file
  should reflect the content of the alignment index. You can
  automatically create the file name defined in
  `['bio.ngs.settings']['annotation']['transcript_annot_gtf']` from
  the list of files defined in
  `['bio.ngs.settings']['annotation']['sources']` via the rule
  `dbutils_make_transcript_annot_gtf`. gtf and genbank input format is
  accepted.

`bio.ngs.db.ercc.ercc_create_ref`
  The `ERCC RNA Spike-In Mix
  <https://www.thermofisher.com/order/catalog/product/4456740>`_ is
  commonly used as spike-in. The rule `ercc_create_ref` automates
  download of the sequences in fasta and genbank formats.

Workflow
""""""""""

The figure below illustrates the workflow included in the test
directory. Here, use has been made of the additional rules mentioned
above to generate ERCC spike-ins and the transcript annotation gtf.

.. graphviz::

   digraph snakemake_dag {
    graph[bgcolor=white, margin=0];
    node[shape=box, style=rounded, fontname=sans,                 fontsize=10, penwidth=2];
    edge[penwidth=2, color=grey];
	0[label = "conf_yaml", color = "0.27 0.6 0.85", style="rounded"];
	1[label = "star_align_log", color = "0.17 0.6 0.85", style="rounded"];
	2[label = "rulegraph_png", color = "0.02 0.6 0.85", style="rounded"];
	3[label = "rseqc_read_quality", color = "0.28 0.6 0.85", style="rounded"];
	4[label = "scrnaseq_aggregate_rseqc_genebody_coverage", color = "0.29 0.6 0.85", style="rounded"];
	5[label = "emboss_seqret_fa_to_genbank", color = "0.05 0.6 0.85", style="rounded"];
	6[label = "picard_sort_sam", color = "0.06 0.6 0.85", style="rounded"];
	7[label = "scrnaseq_qc", color = "0.62 0.6 0.85", style="rounded"];
	8[label = "rseqc_qc", color = "0.09 0.6 0.85", style="rounded"];
	9[label = "scrnaseq_aggregate_align", color = "0.32 0.6 0.85", style="rounded"];
	10[label = "gtf_to_bed12", color = "0.35 0.6 0.85", style="rounded"];
	11[label = "ercc_download_metadata", color = "0.57 0.6 0.85", style="rounded"];
	12[label = "samtools_index", color = "0.39 0.6 0.85", style="rounded"];
	13[label = "rseqc_read_duplication", color = "0.41 0.6 0.85", style="rounded"];
	14[label = "scrnaseq_aggregate_rpkmforgenes", color = "0.00 0.6 0.85", style="rounded"];
	15[label = "rseqc_read_GC", color = "0.43 0.6 0.85", style="rounded"];
	16[label = "rpkmforgenes_from_bam", color = "0.45 0.6 0.85", style="rounded"];
	17[label = "save_align_rseqc_data", color = "0.48 0.6 0.85", style="rounded"];
	18[label = "scrnaseq_all", color = "0.47 0.6 0.85", style="rounded"];
	19[label = "scrnaseq_pca", color = "0.61 0.6 0.85", style="rounded"];
	20[label = "rsem_calculate_expression", color = "0.13 0.6 0.85", style="rounded"];
	21[label = "scrnaseq_aggregate_rseqc_read_distribution", color = "0.50 0.6 0.85", style="rounded"];
	22[label = "rsem_prepare_reference", color = "0.14 0.6 0.85", style="rounded"];
	23[label = "rulegraph", color = "0.15 0.6 0.85", style="rounded"];
	24[label = "picard_merge_sam", color = "0.52 0.6 0.85", style="rounded"];
	25[label = "star_index", color = "0.53 0.6 0.85", style="rounded"];
	26[label = "dbutils_make_transcript_annot_gtf", color = "0.51 0.6 0.85", style="rounded"];
	27[label = "ercc_create_ref", color = "0.42 0.6 0.85", style="rounded"];
	28[label = "rseqc_geneBody_coverage", color = "0.18 0.6 0.85", style="rounded"];
	29[label = "bamtools_filter_unique", color = "0.56 0.6 0.85", style="rounded"];
	30[label = "scrnaseq_aggregate_rsem", color = "0.21 0.6 0.85", style="rounded"];
	31[label = "rseqc_read_distribution", color = "0.22 0.6 0.85", style="rounded"];
	32[label = "rseqc_clipping_profile", color = "0.58 0.6 0.85", style="rounded"];
	33[label = "rseqc_junction_annotation", color = "0.60 0.6 0.85", style="rounded"];
	34[label = "star_align_pe", color = "0.23 0.6 0.85", style="rounded"];
	35[label = "scrnaseq_picard_merge_sam_transcript", color = "0.24 0.6 0.85", style="rounded"];
	36[label = "rseqc_read_NVC", color = "0.66 0.6 0.85", style="rounded"];
	34 -> 1
	23 -> 2
	24 -> 3
	28 -> 4
	24 -> 6
	19 -> 7
	17 -> 7
	2 -> 7
	0 -> 7
	3 -> 8
	28 -> 8
	13 -> 8
	31 -> 8
	32 -> 8
	15 -> 8
	33 -> 8
	36 -> 8
	1 -> 9
	26 -> 10
	6 -> 12
	24 -> 13
	16 -> 14
	24 -> 15
	24 -> 16
	26 -> 16
	21 -> 17
	9 -> 17
	4 -> 17
	16 -> 18
	29 -> 18
	8 -> 18
	20 -> 18
	7 -> 18
	30 -> 19
	14 -> 19
	22 -> 20
	35 -> 20
	31 -> 21
	26 -> 22
	29 -> 24
	26 -> 25
	27 -> 25
	5 -> 26
	27 -> 26
	11 -> 27
	6 -> 28
	10 -> 28
	12 -> 28
	34 -> 29
	20 -> 30
	10 -> 31
	24 -> 31
	24 -> 32
	10 -> 33
	24 -> 33
	25 -> 34
	34 -> 35
	24 -> 36
   }          

   
Troubleshooting
""""""""""""""""""
