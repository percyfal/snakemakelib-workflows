# Copyright (C) 2015 by Per Unneberg
import pandas as pd
import jinja2
from math import log10
from snakemake.report import data_uri
from snakemakelib import SNAKEMAKELIB_TEMPLATES_PATH
from snakemakelib_workflows import SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH
from snakemakelib.resources import css_files
from blaze import Data, append, odo, DataFrame
from snakemakelib.odo import cutadapt, qualimap, picard
from snakemakelib.plot.bokeh import static_html
from bokeh.charts import Scatter
from bokeh.plotting import figure, gridplot
from bokehutils.geom import points, abline, lines
from bokehutils.mgeom import mlines
from bokehutils.facet import facet_grid
from bokehutils.axes import xaxis, yaxis, main
from bokehutils.color import colorbrewer

DEFAULT_TOOLS = "pan,wheel_zoom,box_zoom,box_select,reset,save"

# Template environment
loader = jinja2.FileSystemLoader([SNAKEMAKELIB_TEMPLATES_PATH,
                                  SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH])
Env = jinja2.Environment(loader=loader)


def set_protected_output_by_extension(*rules, re_extension=None):
    """For some temporary rules, move output from temporary to protected"""
    if re_extension is None:
        return
    for rule in rules:
        dset = set()
        for output in rule.temp_output:
            if re_extension.search(output):
                dset.add(output)
                rule.protected_output.add(output)
        for e in dset:
            rule.temp_output.remove(e)


def _collect_cutadapt_metrics(targets, parser):
    def _annotate_df(tgt):
        df = odo(tgt, DataFrame)
        m = parser.parse(tgt)
        df["SM"] = str(m['SM'])
        df["PU"] = str(m['PU'])
        return df
    dflist = [_annotate_df(t) for t in targets]
    df_long = pd.concat(dflist)
    df = df_long.reset_index().pivot_table(values=["value"], index=["SM", "PU"], columns="statistic")
    df.columns = df.columns.droplevel()
    df["Read 1 percent"] = 100.0 * df["Read 1 with adapter"] /\
        df["Total read pairs processed"]
    df["Read 2 percent"] = 100.0 * df["Read 2 with adapter"] /\
        df["Total read pairs processed"]
    df_long = df.stack()
    df_long.name = "value"
    return df_long


READ_ROWS = ["number of reads",
             "number of mapped reads",
             "number of duplicated reads",
             "number of unique reads"]
def _collect_qualimap_metrics(targets, parser):
    def _annotate_df(tgt):
        df_dict = odo(tgt, dict)
        m = parser.parse(tgt)
        for v in df_dict.values():
            v["SM"] = str(m["SM"])
        df_dict["Globals"].loc["number of unique reads",:] = df_dict["Globals"].loc["number of mapped reads",:].copy()
        df_dict["Globals"].loc["number of unique reads","value"] = df_dict["Globals"].loc["number of mapped reads", "value"] - df_dict["Globals"].loc["number of duplicated reads", "value"]
        df_dict["Globals"].loc[:, "percent"] = df_dict["Globals"].loc[:, "value"]
        df_dict["Globals"].loc[READ_ROWS, "percent"] = 100.0 * df_dict["Globals"].loc[READ_ROWS, "percent"] / df_dict["Globals"].loc["number of reads", "percent"]
        df_dict["Coverage_per_contig"]["chrlen_percent"] = 100.0 * df_dict['Coverage_per_contig']['chrlen'] / sum(df_dict['Coverage_per_contig']['chrlen'])
        df_dict["Coverage_per_contig"]["mapped_bases_percent"] = 100.0 * df_dict['Coverage_per_contig']['mapped_bases'] / sum(df_dict['Coverage_per_contig']['mapped_bases'])
        return df_dict
    df_dict_list = [_annotate_df(t) for t in targets]
    df_dict = dict()
    for k in df_dict_list[0].keys():
        df_dict[k] = pd.concat([d[k] for d in df_dict_list])
    return df_dict

def _collect_picard_metrics(targets, parser):
    def _annotate_df(tgt):
        metrics, hist = odo(tgt, list)
        m = parser.parse(tgt)
        metrics['SM'] = str(m['SM'])
        if not hist is None:
            hist["SM"] = str(m['SM'])
        return metrics, hist
    # http://stackoverflow.com/questions/21867303/how-to-split-a-list-of-2-tuples-into-two-lists
    mlist, hlist = zip(*[_annotate_df(t) for t in targets])
    metrics = pd.concat(mlist)
    try:
        hist = pd.concat(hlist)
    except:
        hist = None
    return (metrics, hist)
    
def atacseq_summary(config, input, output):
    """Make atacseq summary"""
    d = {}

    # Cutadapt
    if config['atacseq.workflow']['trimadaptor']:
        cutadapt_metrics = _collect_cutadapt_metrics(input.cutadapt, config['bio.ngs.settings']['sampleorg'].run_id_re)
        df = cutadapt_metrics.loc[:,:,["Read 1 percent", "Read 2 percent"]].reset_index()
        # FIXME: remove when multiple grouping possible
        df['SampleUnit'] = df['SM'] + "__" + df['PU']
        d.update({'cutadapt': {'fig': Scatter(df, x="SampleUnit", y="value",
                                              color="statistic", legend="top_right",
                                              title="Cutadapt metrics")}})

    # Qualimap
    qualimap_metrics_dict = _collect_qualimap_metrics(input.qualimap, config['bio.ngs.settings']['sampleorg'].sample_re)
    READ_ROWS = ["number of reads",
                 "number of mapped reads",
                 "number of duplicated reads",
                 "number of unique reads"]
    df = qualimap_metrics_dict["Globals"].loc[READ_ROWS].reset_index()
    df["value"] = [log10(x) for x in df["value"]]
    p1 = Scatter(df, x="SM", y="value",
                 color="statistic", legend="top_right",
                 ylabel="log10(count)", title="Qualimap read summary")
    df_rel = qualimap_metrics_dict["Globals"].loc[READ_ROWS]
    p2 = Scatter(df, x="SM", y="percent",
                 color="statistic", legend="top_right",
                 title="Qualimap read summary, percent")
    # Coverage per contig
    df_all = qualimap_metrics_dict["Coverage_per_contig"]
    fig = figure(width=300, height=300)
    points(fig, x="chrlen_percent", y="mapped_bases_percent",
               df=df_all, glyph="text", text="chr", text_font_size="8pt")
    main(fig, title_text_font_size="8pt")
    xaxis(fig, axis_label="Chromosome length of total (%)",
          axis_label_text_font_size="8pt")
    yaxis(fig, axis_label="Mapped bases of total (%)",
          axis_label_text_font_size="8pt")
    gp = facet_grid(fig, x="chrlen_percent", y="mapped_bases_percent",
                    df=df_all, groups=["SM"], width=300, height=300,
                    share_x_range=True, share_y_range=True,
                    title_text_font_size="12pt")
    for fig in [item for sublist in gp.children for item in sublist]:
        abline(fig, x="chrlen_percent", y="mapped_bases_percent", df=df_all, slope=1)
    d.update({'qualimap' : {'fig':{'globals': gridplot([[p1, p2]]), 'coverage_per_contig': gp}}})

    # Picard
    align_metrics, _ = _collect_picard_metrics(input.align_metrics, config['bio.ngs.settings']['sampleorg'].sample_re)
    insert_metrics, insert_hist = _collect_picard_metrics(input.insert_metrics, config['bio.ngs.settings']['sampleorg'].sample_re)

    # Insert metrics
    i1 = Scatter(insert_metrics, x="SM", y="MEAN_INSERT_SIZE",
                 color="PAIR_ORIENTATION", width=400, height=400,
                 legend="top_right",
                 title="Mean insert size")
    fig = figure(width=400, height=400, title="Insert size distribution", title_text_font_size = "10pt")
    all_reads = [x for x in list(insert_hist.columns) if x.startswith("All_Reads")]
    mlines(fig, df=insert_hist, x="insert_size",
           y=all_reads, legend=all_reads,
           color=colorbrewer(datalen = len(all_reads)), line_width=2)
    gp = facet_grid(fig, df=insert_hist, ncol=3,
                    groups=["SM"], width=300, height=300,
                    share_x_range=True, x='insert_size',
                    y=[x for x in list(insert_hist.columns) if x.startswith("All_Reads")])
    plist = [i1] + [x for sublist in gp.children for x in sublist]
    gp = gridplot([plist[i:i+3] for i in range(0, len(plist), 3)])
    d.update({'picard': {'InsertMetrics': {'atacseq' : {'fig': gp}}}})
    
    # Duplication metrics
    dup_metrics, dup_hist = _collect_picard_metrics(input.dup_metrics, config['bio.ngs.settings']['sampleorg'].sample_re)
    dup_metrics["PERCENT_DUPLICATION"] = 100.0 * dup_metrics["PERCENT_DUPLICATION"]
    d1 = Scatter(dup_metrics, x="SM", y="PERCENT_DUPLICATION",
                 legend="top_right",
                 title="Percent duplication per sample")
    d2 = figure(width=400, height=400, title="Return of investment")
    lines(d2, df=dup_hist, groups=["SM"], x="BIN", y="VALUE", legend="SM", color="blue", line_width=2)
    d['picard'].update({'DuplicationMetrics': {'atacseq': {'fig': gridplot([[d1, d2]])}}})
    
    d.update({'rulegraph' : {'fig' : input.rulegraph, 'uri': data_uri(input.rulegraph),
                             'target' : 'atacseq_all'}})


    # Write the resulting html
    tp = Env.get_template('workflow_atacseq_qc.html')
    with open(output.html, "w") as fh:
        fh.write(static_html(tp, template_variables=d, css_raw=css_files))

