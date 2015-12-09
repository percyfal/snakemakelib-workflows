# Copyright (C) 2015 by Per Unneberg
import pandas as pd
from snakemakelib.application import SampleApplication, PlatformUnitApplication
from snakemakelib.io import IOTarget, IOAggregateTarget
from snakemakelib.graphics import scatter, points, tooltips, facet_grid, colorbrewer, mlines, lines
from blaze import Data, append, odo, DataFrame
from snakemakelib.odo import cutadapt, qualimap, picard
from bokeh.charts import Scatter
from bokeh.plotting import figure, gridplot
from bokeh.models import HoverTool

__all__ = ['atacseq_cutadapt_plot_metrics',
           'atacseq_qualimap_plot_globals'
           'atacseq_qualimap_plot_coverage_per_contig',
           'atacseq_insert_metrics_plot',
           'atacseq_insert_metrics_hist_plot',
           'atacseq_mark_duplicates_plot',
           'atacseq_mark_duplicates_hist_plot']


DEFAULT_TOOLS = "pan,wheel_zoom,box_zoom,box_select,reset,save,hover,resize"


# Plotting functions
def atacseq_cutadapt_plot_metrics(df, **kwargs):
    df.set_index(['SM', 'PU', 'PlatformUnit', 'statistic'], inplace=True)
    df.sortlevel(inplace=True)
    df = df.loc[pd.IndexSlice[:, :, :, ["Read 1 percent", "Read 2 percent"]], :].reset_index()
    from bokeh.charts import Scatter
    p = Scatter(df, x="PlatformUnit", y="value",
                color="statistic", legend="top_right",
                title="Cutadapt metrics", ylabel="% reads with adapter")
    return p

def atacseq_qualimap_plot_globals(df, **kwargs):
    READ_ROWS = ["number of reads",
                 "number of mapped reads",
                 "number of duplicated reads",
                 "number of unique reads"]
    df.set_index(['statistic', 'SM'], inplace=True)
    df.sortlevel(inplace=True)
    df = df.loc[pd.IndexSlice[READ_ROWS, :]].reset_index()
    df["value"] = [log10(x) for x in df["value"]]
    df["SM"] = df["SM"].astype(str)
    p1 = Scatter(df, x="SM", y="value",
                 color="statistic", legend="top_right",
                 ylabel="log10(count)", title="Qualimap read summary")
    p2 = Scatter(df, x="SM", y="percent",
                 color="statistic", legend="top_right",
                 title="Qualimap read summary, percent")
    return gridplot([[p1, p2]])

def atacseq_qualimap_plot_coverage_per_contig(df, **kwargs):
    p, source = points(df=df, x="chrlen_percent",
                       y="mapped_bases_percent", glyph="circle",
                       return_source=True, legend="top_right",
                       tools=DEFAULT_TOOLS, size=6, alpha=.9,
                       color="SM", plot_height=600, plot_width=800)
    p.xaxis.axis_label = "chrlen (% of genome)"
    p.yaxis.axis_label = "mapped reads (% of total)"
    tooltips(p, HoverTool, [('Sample', '@SM'),
                            ('Chromosome', '@chr')])
    return p
    

def atacseq_insert_metrics_plot(df, **kwargs):
    df['SM'] = df['SM'].astype(str)
    p = Scatter(df, x="SM", y="MEAN_INSERT_SIZE",
                color="PAIR_ORIENTATION", width=400, height=400,
                legend="top_right",
                title="Mean insert size")
    return p

def atacseq_insert_metrics_hist_plot(df, **kwargs):
    fig = figure(width=400, height=400, title="Insert size distribution", title_text_font_size = "10pt")
    all_reads = [x for x in list(df.columns) if x.startswith("All_Reads")]
    mlines(fig, df=df, x="insert_size",
           y=all_reads, legend=all_reads,
           color=colorbrewer(datalen = len(all_reads)), line_width=2)
    gp = facet_grid(fig, df=df, ncol=3,
                    groups=["SM"], width=300, height=300,
                    share_x_range=True, x='insert_size',
                    y=[x for x in all_reads])
    return gp

def atacseq_mark_duplicates_plot(df, **kwargs):
    df["PERCENT_DUPLICATION"] = 100.0 * df["PERCENT_DUPLICATION"]
    df['SM'] = df['SM'].astype(str)
    p = Scatter(df, x="SM", y="PERCENT_DUPLICATION",
                legend="top_right",
                title="Percent duplication per sample")
    return p

def atacseq_mark_duplicates_hist_plot(df, **kwargs):
    p = figure(width=400, height=400, title="Return of investment")
    lines(p, df=df, groups=["SM"], x="BIN", y="VALUE", legend="SM",
          color="blue", line_width=2)
    return p
    
