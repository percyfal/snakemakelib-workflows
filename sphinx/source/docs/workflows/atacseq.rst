ATAC-seq
----------

Configuration
""""""""""""""""""""

Workflow
"""""""""""""""

.. graphviz::

   digraph snakemake_dag {
    graph[bgcolor=white, margin=0];
    node[shape=box, style=rounded, fontname=sans,                 fontsize=10, penwidth=2];
    edge[penwidth=2, color=grey];
	0[label = "picard_build_bam_index", color = "0.01 0.6 0.85", style="rounded"];
	1[label = "rulegraph_png", color = "0.65 0.6 0.85", style="rounded"];
	2[label = "cutadapt_cut_paired_end", color = "0.18 0.6 0.85", style="rounded"];
	3[label = "picard_sort_sam", color = "0.04 0.6 0.85", style="rounded"];
	4[label = "atacseq_aggregate_picard_results", color = "0.36 0.6 0.85", style="rounded"];
	5[label = "bowtie2_build", color = "0.55 0.6 0.85", style="rounded"];
	6[label = "picard_collect_alignment_summary_metrics", color = "0.19 0.6 0.85", style="rounded"];
	7[label = "bowtie2_align_pe", color = "0.22 0.6 0.85", style="rounded"];
	8[label = "macs2_callpeak_treatment_only_bam_pe", color = "0.24 0.6 0.85", style="rounded"];
	9[label = "picard_merge_sam", color = "0.43 0.6 0.85", style="rounded"];
	10[label = "atacseq_report", color = "0.44 0.6 0.85", style="rounded"];
	11[label = "picard_mark_duplicates_log", color = "0.15 0.6 0.85", style="rounded"];
	12[label = "atacseq_aggregate_qualimap_results", color = "0.47 0.6 0.85", style="rounded"];
	13[label = "qualimap_bamqc", color = "0.46 0.6 0.85", style="rounded"];
	14[label = "bamtools_filter_script", color = "0.31 0.6 0.85", style="rounded"];
	15[label = "rulegraph", color = "0.09 0.6 0.85", style="rounded"];
	16[label = "atacseq_correct_coordinates", color = "0.50 0.6 0.85", style="rounded"];
	17[label = "picard_collect_insert_size_metrics", color = "0.28 0.6 0.85", style="rounded"];
	18[label = "atacseq_all", color = "0.37 0.6 0.85", style="rounded"];
	19[label = "atacseq_aggregate_cutadapt_results", color = "0.33 0.6 0.85", style="rounded"];
	20[label = "picard_mark_duplicates", color = "0.13 0.6 0.85", style="rounded"];
	9 -> 0
	20 -> 0
	15 -> 1
	7 -> 3
	6 -> 4
	11 -> 4
	17 -> 4
	0 -> 6
	20 -> 6
	2 -> 7
	5 -> 7
	16 -> 8
	3 -> 9
	1 -> 10
	12 -> 10
	19 -> 10
	4 -> 10
	20 -> 11
	13 -> 12
	9 -> 13
	9 -> 14
	14 -> 16
	0 -> 17
	20 -> 17
	6 -> 18
	8 -> 18
	10 -> 18
	11 -> 18
	1 -> 18
	17 -> 18
	2 -> 19
	0 -> 20
	9 -> 20
   }

Troubleshooting
"""""""""""""""""""

Reference guide
""""""""""""""""

.. toctree::
   :maxdepth: 2

   ../reference/atacseq
