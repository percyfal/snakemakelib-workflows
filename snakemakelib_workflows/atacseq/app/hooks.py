# Copyright (C) 2015 by Per Unneberg
from pandas import pd


__all__ = ['atacseq_cutadapt_post_processing_hook',
           'atacseq_qualimap_globals_post_processing_hook',
           'atacseq_qualimap_coverage_per_contig_post_processing_hook'
]

def atacseq_cutadapt_post_processing_hook(df, **kwargs):
    df_wide = df.reset_index().pivot_table(values=["value"], index=["SM", "PU", "PlatformUnit"], columns="statistic")
    df_wide.columns = df_wide.columns.droplevel()
    df_wide["Read 1 percent"] = 100.0 * df_wide["Read 1 with adapter"] /\
        df_wide["Total read pairs processed"]
    df_wide["Read 2 percent"] = 100.0 * df_wide["Read 2 with adapter"] /\
        df_wide["Total read pairs processed"]
    df = df_wide.stack()
    df.name = "value"
    return df


def atacseq_qualimap_globals_post_processing_hook(df, **kwargs):
    tmp = df.loc["number of mapped reads"] -  df.loc["number of duplicated reads"]
    tmp['statistic'] = "number of unique reads"
    tmp = tmp.reset_index().set_index(['statistic', 'SM'])
    df = df.append(tmp)
    df.sortlevel(inplace=True)
    df["percent"] = df["value"]
    df["percent"] = 100.0 * df["percent"] / df.loc["number of reads"]["percent"]
    return df

def atacseq_qualimap_coverage_per_contig_post_processing_hook(df, **kwargs):
    df['chrlen_percent'] = 100.0 * df['chrlen'] / sum(df['chrlen'])
    df['mapped_bases_percent'] = 100.0 * df['mapped_bases'] / sum(df['mapped_bases'])
    return df
