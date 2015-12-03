# Copyright (C) 2015 by Per Unneberg
import pandas as pd
from snakemakelib.bio.ngs.rnaseq.utils import _gene_name_map_from_gtf

__all__ = ['scrnaseq_annotate_genes_hook', 'scrnaseq_annotate_isoforms_hook',
           'scrnaseq_rseqc_genebody_coverage_hook',
           'scrnaseq_rseqc_read_distribution_hook',
           'scrnaseq_star_align_postprocessing_hook']


def scrnaseq_annotate_genes_hook(df, annotation, **kwargs):
    df.reset_index(inplace=True)
    annot = pd.read_table(annotation, header=None)
    mapping = _gene_name_map_from_gtf(annot, "gene_id", "gene_name")
    df["gene_name"] = df["gene_id"].map(mapping.get)
    return df


def scrnaseq_annotate_isoforms_hook(df, annotation, **kwargs):
    df.reset_index(inplace=True)
    annot = pd.read_table(annotation, header=None)
    mapping = _gene_name_map_from_gtf(annot, "transcript_id", "transcript_name")
    df["transcript_name"] = df["transcript_id"].map(mapping.get)
    return df


def scrnaseq_rseqc_genebody_coverage_hook(df, **kwargs):
    df['three_prime_map'] = 100.0 * df.loc[:, "91":"100"].sum(axis=1) / df.loc[:, "1":"100"].sum(axis=1)
    return df


def scrnaseq_rseqc_read_distribution_hook(df, **kwargs):
    df = df.reset_index().set_index("Group")
    exonmap = df.loc['Introns', :]
    cols = ["Total_bases", "Tag_count", "Tags/Kb"]
    exonmap.loc[cols] = 100 * (df.loc['CDS_Exons', cols] + df.loc["3'UTR_Exons", cols] + df.loc["5'UTR_Exons", cols]) / df.loc[:, cols].sum(axis=0)
    df.loc["ExonMap_%", :] = exonmap
    return df


def scrnaseq_star_align_postprocessing_hook(df, **kwargs):
    df.loc['mismatch_sum', :] = df.loc['Mismatch rate per base, %',:].copy()
    df.loc['mismatch_sum', "value"] = df.loc['Mismatch rate per base, %', "value"]   + df.loc['Deletion rate per base', "value"] + df.loc['Insertion rate per base', "value"]
    df.loc['% of reads unmapped', :] = df.loc['% of reads unmapped: other', :]
    df.loc['% of reads unmapped', "value"] = df.loc['% of reads unmapped: other', "value"] + df.loc['% of reads unmapped: too many mismatches', "value"] + df.loc['% of reads unmapped: too short', "value"]
    return df
