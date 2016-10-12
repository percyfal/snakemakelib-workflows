# Copyright (C) 2015 by Per Unneberg
import pandas as pd
from math import log10
from snakemakelib.application import SampleApplication, PlatformUnitApplication
from snakemakelib.io import IOTarget, IOAggregateTarget
from snakemakelib.graphics import scatter, points, tooltips, facet_grid, colorbrewer, mlines, lines
from blaze import Data, append, odo, DataFrame
from snakemakelib.odo import cutadapt, qualimap, picard
from bokeh.charts import Scatter
from bokeh.plotting import figure, gridplot
from bokeh.models import HoverTool

__all__ = ['atacseq_cutadapt_plot_metrics',
           'atacseq_qualimap_plot_globals',
           'atacseq_qualimap_plot_coverage_per_contig',
           'atacseq_insert_metrics_plot',
           'atacseq_insert_metrics_hist_plot',
           'atacseq_mark_duplicates_plot',
           'atacseq_mark_duplicates_hist_plot']


DEFAULT_TOOLS = "pan,wheel_zoom,box_zoom,box_select,reset,save,hover,resize"


# Plotting functions
def atacseq_cutadapt_plot_metrics(df, **kwargs):
    """Plot cutadapt metrics.

    Args:
      df(:class:`~pandas.DataFrame`): data frame holding summary of cutadapt results. The summary is provided by  :meth:`snakemakelib.odo.cutadapt.resource_cutadapt_metrics`.
      kwargs(dict): keyword arguments

    Returns:
      :class:`bokeh.charts.Scatter`: a scatter plot

    Examples:

    .. bokeh-plot::
        :source-position: above

        import pandas as pd
        from bokeh.plotting import show
        from snakemakelib_workflows.atacseq.app import atacseq_cutadapt_plot_metrics

        df = pd.DataFrame([['S1', 'P1', 'S1_P1', 'Read 1 percent', 80],
                           ['S1', 'P2', 'S1_P2', 'Read 1 percent', 40]],
                          columns=['SM','PU','PlatformUnit','statistic','value'])
        p = atacseq_cutadapt_plot_metrics(df, height=200, width=200)
        show(p)

    """
    if df is None:
        return figure(title="Cutadapt metrics (no data)",
                      height=kwargs.get("height", 400),
                      width=kwargs.get("width", 400))
    df.set_index(['SM', 'PU', 'PlatformUnit', 'statistic'], inplace=True)
    df.sortlevel(inplace=True)
    df = df.loc[pd.IndexSlice[:, :, :, ["Read 1 percent", "Read 2 percent"]], :].reset_index()
    from bokeh.charts import Scatter
    p = Scatter(df, x="PlatformUnit", y="value",
                color="statistic", legend="top_right",
                title="Cutadapt metrics", ylabel="% reads with adapter")
    return p

def atacseq_qualimap_plot_globals(df, **kwargs):
    """Plot qualimap global statistics.

    Args:
      df(:class:`~pandas.DataFrame`): data frame holding summary of qualimap results. The summary is provided by  :meth:`snakemakelib.odo.qualimap.resource_genome_results`.
      kwargs(dict): keyword arguments

    Returns:
      (:class:`bokeh.plotting.gridplot`): bokeh gridplot

    Examples:

    .. bokeh-plot::
        :source-position: above

        import pandas as pd
        from bokeh.plotting import show
        from snakemakelib_workflows.atacseq.app import atacseq_qualimap_plot_globals

        df = pd.DataFrame([['S1', 'number of reads', 80, 100],
                           ['S1', 'number of mapped reads', 20, 25],
                           ['S1', 'number of duplicated reads', 10, 25],
                           ['S1', 'number of unique reads', 10, 12.5]],
                          columns=['SM','statistic','value', 'percent'])
        p = atacseq_qualimap_plot_globals(df, height=200, width=200)
        show(p)


    """
    READ_ROWS = ["number of reads",
                 "number of mapped reads",
                 "number of duplicated reads",
                 "number of unique reads"]
    df.set_index(['statistic', 'SM'], inplace=True)
    df.sortlevel(inplace=True)
    df = df.loc[pd.IndexSlice[READ_ROWS, :]].reset_index()
    df["value"] = [log10(x) for x in df["value"]]
    df["SM"] = df["SM"].astype(str)
    p1 = Scatter(df, x="SM", y="value", color="statistic",
                 legend="top_right", ylabel="log10(count)",
                 title="Qualimap read summary",
                 height=kwargs.get("height", 400),
                 width=kwargs.get("width", 400))
    p2 = Scatter(df, x="SM", y="percent",
                 color="statistic", legend="top_right",
                 title="Qualimap read summary, percent",
                 height=kwargs.get("height", 400),
                 width=kwargs.get("width", 400))
    return gridplot([[p1, p2]])

def atacseq_qualimap_plot_coverage_per_contig(df, **kwargs):
    """Plot qualimap coverage per contig.

    Args:
      df(:class:`~pandas.DataFrame`): data frame holding summary of qualimap results. The summary is provided by  :meth:`snakemakelib.odo.qualimap.resource_genome_results`.
      kwargs(dict): keyword arguments

    Returns:
      :class:`bokeh.plotting.figure`: bokeh scatter plot

    Examples:

    .. bokeh-plot::
        :source-position: above

        import pandas as pd
        from bokeh.plotting import show
        from snakemakelib_workflows.atacseq.app import atacseq_qualimap_plot_coverage_per_contig

        df = pd.DataFrame([['S1', 'chr1', 4e6, 8e6, 2, 5, 80, 40],
                           ['S1', 'chr2', 1e6, 12e6, 12, 20, 20, 60],
                           ['S2', 'chr1', 4e6, 12e6, 3, 5, 80, 60],
                           ['S2', 'chr2', 1e6, 8e6, 8, 20, 20, 40]],
                           columns=['SM', 'chr','chrlen', 'mapped_bases', 'mean_coverage', 'sd', 'chrlen_percent','mapped_bases_percent'])
        p = atacseq_qualimap_plot_coverage_per_contig(df)
        show(p)


    """
    p = points(df=df, x="chrlen_percent",
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
    """Plot qualimap global statistics.

    Args:
      df(:class:`~pandas.DataFrame`): data frame holding summary of picard insert metrics results. The summary is provided by :meth:`snakemakelib.odo.picard.resource_insert_metrics`.
      kwargs(dict): keyword arguments

    Returns:
      :class:`bokeh.charts.Scatter`: bokeh scatterplot

    Examples:

    .. bokeh-plot::
        :source-position: above

        import pandas as pd
        from bokeh.plotting import show
        from snakemakelib_workflows.atacseq.app import atacseq_insert_metrics_plot

        df = pd.DataFrame([['S1', 120, "FR"],
                           ['S1', 100, "RF"],
                           ['S2', 140, "FR"],
                           ['S2', 120, "RF"]],
                          columns=['SM','MEAN_INSERT_SIZE','PAIR_ORIENTATION'])
        p = atacseq_insert_metrics_plot(df, height=200, width=200)
        show(p)


    """
    df['SM'] = df['SM'].astype(str)
    p = Scatter(df, x="SM", y="MEAN_INSERT_SIZE",
                color="PAIR_ORIENTATION", width=400, height=400,
                legend="top_right",
                title="Mean insert size")
    return p

def atacseq_insert_metrics_hist_plot(df, **kwargs):
    """Plot qualimap global statistics.

    Args:
      df(:class:`~pandas.DataFrame`): data frame holding summary of qualimap results. The summary is provided by :meth:`snakemakelib.odo.picard.resource_insert_metrics`.
      kwargs(dict): keyword arguments

    Returns:
      :class:`bokeh.plotting.gridplot`: bokeh gridplot

    Examples:

    .. bokeh-plot::
        :source-position: above

        import pandas as pd
        from bokeh.plotting import show
        from snakemakelib_workflows.atacseq.app import atacseq_insert_metrics_hist_plot

        df = pd.DataFrame([['S1', 20, 2, 3],
                           ['S1', 21, 5, 4],
                           ['S1', 22, 15, 22],
                           ['S2', 20, 3, 1],
                           ['S2', 21, 4, 2],
                           ['S2', 22, 12, 10]],
                          columns=['SM','insert_size','All_Reads.fr_count', 'All_Reads.rf_count'])
        p = atacseq_insert_metrics_hist_plot(df)
        show(p)


    """
    fig = figure(width=400, height=400, title="Insert size distribution")
    fig.title.text_font_size = "10pt"
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
    """Plot qualimap global statistics.

    Args:
      df(:class:`~pandas.DataFrame`): data frame holding summary of qualimap results. The summary is provided by :meth:`snakemakelib.odo.picard.resources_dup_metrics`.
      kwargs(dict): keyword arguments

    Returns:
      :class:`bokeh.charts.Scatter`: bokeh scatter plot

    Examples:

    .. bokeh-plot::
        :source-position: above

        import pandas as pd
        from bokeh.plotting import show
        from snakemakelib_workflows.atacseq.app import atacseq_mark_duplicates_plot

        df = pd.DataFrame([['S1', 20],
                           ['S2', 25]],
                          columns=['SM','PERCENT_DUPLICATION'])
        p = atacseq_mark_duplicates_plot(df)
        show(p)


    """
    if df is None:
        return figure(width=400, height=400, title="Percent duplication per sample (no data)")
    df["PERCENT_DUPLICATION"] = 100.0 * df["PERCENT_DUPLICATION"]
    df['SM'] = df['SM'].astype(str)
    p = Scatter(df, x="SM", y="PERCENT_DUPLICATION",
                legend="top_right",
                title="Percent duplication per sample")
    return p

def atacseq_mark_duplicates_hist_plot(df, **kwargs):
    """Plot qualimap global statistics.

    Args:
      df(:class:`~pandas.DataFrame`): data frame holding summary of qualimap results. The summary is provided by :meth:`snakemakelib.odo.picard.resource_dup_metrics`.
      kwargs(dict): keyword arguments

    Returns:
      :class:`bokeh.plotting.figure`: bokeh figure

    Examples:

    .. bokeh-plot::
        :source-position: above

        import pandas as pd
        from bokeh.plotting import show
        from snakemakelib_workflows.atacseq.app import atacseq_mark_duplicates_hist_plot

        df = pd.DataFrame([['S1', 1.0, 1.5],
                           ['S1', 2.0, 2.8],
                           ['S2', 1.0, 1.9],
                           ['S2', 2.0, 12.5]],
                          columns=['SM','BIN','VALUE'])
        p = atacseq_mark_duplicates_hist_plot(df, width=200, height=200)
        show(p)


    """
    p = figure(width=kwargs.get('width', 400),
               height=kwargs.get('height', 400),
               title="Return of investment (no data)")
    if df is None:
        return p
    lines(p, df=df, groups=["SM"], x="BIN", y="VALUE", legend="SM",
          color="blue", line_width=2)
    p.title.text = "Return of investment"
    return p
