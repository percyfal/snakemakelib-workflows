# Copyright (C) 2015 by Per Unneberg
import re
import math
import pandas as pd
import jinja2
import numpy as np
import pickle
from snakemake.report import data_uri
from snakemakelib.odo.utils import annotate_df
from snakemakelib.odo import star, rseqc
from snakemakelib import SNAKEMAKELIB_TEMPLATES_PATH
from snakemakelib.resources import css_files, js_files
from snakemakelib.plot.bokeh import static_html
from snakemakelib_workflows import SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH
from bokeh.models import ColumnDataSource, TableColumn, DataTable, HoverTool, BoxSelectTool
from bokeh.plotting import figure, gridplot, output_file, show
from bokehutils.axes import xaxis, yaxis
from bokehutils.geom import dotplot, points
from bokehutils.tools import tooltips
from snakemakelib.plot.sklearn import plot_pca
from snakemakelib.statistics import pca, pca_results
from snakemakelib.applications import number_of_detected_genes, scrnaseq_brennecke_plot

DEFAULT_TOOLS = "pan,wheel_zoom,box_zoom,box_select,lasso_select,resize,reset,save,hover"

# Template environment
loader = jinja2.FileSystemLoader([SNAKEMAKELIB_TEMPLATES_PATH,
                                  SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH])
Env = jinja2.Environment(loader=loader)


def _collect_alignment_metrics(targets, parser):
    """Collect alignment metrics

    FIXME: move to snakemakelib-core
    """
    def _add_rows(df):
        df.loc['mismatch_sum', :] = df.loc['Mismatch rate per base, %',:].copy()
        df.loc['mismatch_sum', "value"] = df.loc['Mismatch rate per base, %', "value"]   + df.loc['Deletion rate per base', "value"] + df.loc['Insertion rate per base', "value"]
        df.loc['% of reads unmapped', :] = df.loc['% of reads unmapped: other', :]
        df.loc['% of reads unmapped', "value"] = df.loc['% of reads unmapped: other', "value"] + df.loc['% of reads unmapped: too many mismatches', "value"] + df.loc['% of reads unmapped: too short', "value"]
        return df
        
    dflist = [_add_rows(annotate_df(t, parser, groupnames=["SM", "PU"])) for t in targets]
    df_long = pd.concat(dflist)
    return df_long


def _collect_rseqc_metrics(read_distribution, gene_body_coverage, parser):
    """Collect rseqc metrics

    FIXME: move to snakemakelib-core
    """
    def _add_gbc_rows(df):
        df['three_prime_map'] = 100.0 * df.loc[:, "91":"100"].sum(axis=1) / df.loc[:, "1":"100"].sum(axis=1)
        return df
    def _add_rd_rows(df):
        ExonMap = df.loc['Introns', :]
        cols = ["Total_bases", "Tag_count", "Tags/Kb"]
        ExonMap.loc[cols] = 100 * (df.loc['CDS_Exons', cols] + df.loc["3'UTR_Exons", cols] + df.loc["5'UTR_Exons", cols]) / df.loc[:, cols].sum(axis=0)
        df.loc["ExonMap_%", :] = ExonMap
        return df
    gbc = pd.concat([_add_gbc_rows(annotate_df(f, parser)) for f in gene_body_coverage])
    gbc = gbc.set_index(gbc["SM"])
    rd = pd.concat([_add_rd_rows(annotate_df(f, parser)) for f in read_distribution])
    return {"read_distribution": rd, "gene_body_coverage": gbc}


def _save_align_rseqc_metrics(config, input, output):
    align_metrics = _collect_alignment_metrics(
        input.align_log,
        config['settings']['sample_organization'].run_id_re
    )
    rseqc_metrics = _collect_rseqc_metrics(
        input.rseqc_read_distribution,
        input.rseqc_gene_body_coverage,
        config['settings']['sample_organization'].sample_re
    )
    # Removing datetimes for now; try pandas (odo?) coerce_datetimes
    df = align_metrics.drop(align_metrics.index[[0,1,2]]).reset_index()
    df["value"] = pd.to_numeric(df["value"])
    df = df.pivot_table(values="value", index="SM", columns="name")
    df = df.join(rseqc_metrics["read_distribution"].reset_index().pivot_table(columns="Group", values="Tag_count", index="SM"))
    df = df.join(rseqc_metrics["gene_body_coverage"])
    # Remember: ColumnDataSource column names cannot include spaces or %
    df.columns = [x.replace(" ", "_").replace("%", "PCT") for x in df.columns]
    df.to_csv(output.csv)

    
def _dotplot(**kwargs):
    """Make a dotplot figure. 

    FIXME: still depends on bokehutils
    FIXME: make wrapper function in snakemakelib/plot/bokeh
    """
    kwfig = kwargs.pop('kwfig', {})
    kwxaxis = kwargs.pop('kwxaxis', {})
    kwyaxis = kwargs.pop('kwyaxis', {})
    fig = figure(title=kwargs.get('title', "Dotplot"),
                 tools=kwargs.get('tools', DEFAULT_TOOLS),
                 **kwfig)
    source = (kwargs.get('source'))
    dotplot(fig, kwargs['x'], kwargs['y'], source=kwargs.get('source', None))
    xaxis(fig, **kwxaxis)
    yaxis(fig, **kwyaxis)
    return fig


def _align_rseqc_plot(infile):
    df = pd.read_csv(infile)
    df = df.set_index("SM")
    source = ColumnDataSource(df)
    columns = [
        TableColumn(field="SM", title="Sample"),
        TableColumn(field="Number_of_input_reads",
                    title="Number of input reads"),
        TableColumn(field="Uniquely_mapped_reads_PCT",
                    title="Uniquely mapped reads (%)"),
        TableColumn(field="Mismatch_rate_per_base,_PCT",
                    title="Mismatch rate per base (%)"),
        TableColumn(field="Insertion_rate_per_base",
                    title="Insertion rate per base (%)"),
        TableColumn(field="Deletion_rate_per_base",
                    title="Deletion rate per base (%)"),
        TableColumn(field="PCT_of_reads_unmapped",
                    title="Unmapped reads (%)"),
    ]
    table = DataTable(source=source, columns=columns,
                      editable=False, width=1000)
    kwfig = {'plot_width': 400, 'plot_height': 400, 
             'title_text_font_size': "16pt"}
    kwxaxis = {'axis_label': 'Sample',
               'axis_label_text_font_size': '12pt',
               'major_label_orientation': np.pi/3}
    kwyaxis = {'axis_label_text_font_size': '12pt',
               'major_label_orientation': np.pi/3}

    # Input reads
    p1 = _dotplot(
        kwfig=dict(kwfig, **{'x_range': list(df.index), 'y_axis_type': "log"}),
        kwxaxis=kwxaxis,
        kwyaxis=dict(kwyaxis, **{'axis_label': "Reads"}),
        title="Number of input reads", tools=DEFAULT_TOOLS, 
        x="SM", y="Number_of_input_reads", source=source
    )
    tooltips(p1, HoverTool, [('Sample', '@SM'),
                             ('Reads', '@Number_of_input_reads')])

    # Uniquely mapping
    p2 = _dotplot(
        kwfig=dict(kwfig, **{'x_range': p1.x_range, 'y_range': [0, 100]}),
        kwxaxis=kwxaxis,
        kwyaxis=dict(kwyaxis, **{'axis_label': 'Percent'}),
        tools=DEFAULT_TOOLS, title="Uniquely mapping reads",
        x="SM", y="Uniquely_mapped_reads_PCT", source=source
    )
    tooltips(p2, HoverTool, [('Sample', '@SM'),
                             ('Pct_mapped', '@Uniquely_mapped_reads_PCT')])

    # Unmapped
    p3 = _dotplot(
        kwfig=dict(kwfig, **{'x_range': p1.x_range, 'y_range': [0, 100]}),
        kwxaxis=kwxaxis,
        kwyaxis=dict(kwyaxis, **{'axis_label': 'Percent'}),
        tools=DEFAULT_TOOLS, title="Unmapped reads",
        x="SM", y="PCT_of_reads_unmapped", source=source
    )
    tooltips(p3, HoverTool, [('Sample', '@SM'),
                             ('Pct_unmapped', '@PCT_of_reads_unmapped')])

    # Mismatch/indel rate
    p4 = figure(title="Mismatch and indel rates",
                x_range=p1.x_range,
                tools=DEFAULT_TOOLS,
                **kwfig)
    dotplot(p4, "SM", "Mismatch_rate_per_base,_PCT", source=source, legend="Mismatch")
    dotplot(p4, "SM", "Insertion_rate_per_base", source=source, legend="Insertion", color="red")
    dotplot(p4, "SM", "Deletion_rate_per_base", source=source, legend="Deletion", color="green")
    xaxis(p4, **kwxaxis)
    yaxis(p4, axis_label="Percent", **kwyaxis)
    tooltips(p4, HoverTool,  [('Sample', '@SM'),
                              ('Mismatch rate per base',
                               '@Mismatch_rate_per_base,_PCT'),
                              ('Insertion rate per base',
                               '@Insertion_rate_per_base'),
                              ('Deletion rate per base',
                               '@Deletion_rate_per_base'), ])
    select_tool = p4.select(dict(type=BoxSelectTool))
    select_tool.dimensions = ['width']
    
    # Unmapped
    p5 = _dotplot(
        kwfig=dict(kwfig, **{'x_range': p1.x_range}),
        kwxaxis=kwxaxis,
        kwyaxis=dict(kwyaxis, **{'axis_label': 'Percent'}),
        tools=DEFAULT_TOOLS, title="Mismatch/indel sum",
        x="SM", y="mismatch_sum", source=source
    )        
    tooltips(p5, HoverTool, [('Sample', '@SM'),
                             ('Mismatch/indel rate per base',
                              '@mismatch_sum'), ])
    select_tool = p5.select(dict(type=BoxSelectTool))
    select_tool.dimensions = ['width']

    # Fraction reads mapping to 10% right-most end
    p6 = _dotplot(
        kwfig=dict(kwfig, **{'x_range': p1.x_range}),
        kwxaxis=kwxaxis,
        kwyaxis=dict(kwyaxis, **{'axis_label': 'Percent'}),
        tools=DEFAULT_TOOLS, title="Tags mapping to exons",
        x="SM", y="ExonMap_PCT", source=source
    )
    tooltips(p6, HoverTool, [('Sample', '@SM'),
                             ('ExonMap (%)', '@ExonMap_PCT'), ])

    # Fraction reads mapping to 10% right-most end
    p7 = _dotplot(
        kwfig=dict(kwfig, **{'x_range': p1.x_range}),
        kwxaxis=kwxaxis,
        kwyaxis=dict(kwyaxis, **{'axis_label': 'Percent'}),
        tools=DEFAULT_TOOLS, title="Reads mapping to 3' end",
        x="SM", y="three_prime_map", source=source
    )
    tooltips(p7, HoverTool, [('Sample', '@SM'),
                             ("3' map", '@three_prime_map'), ])

    return {'fig': gridplot([[p1, p2, p3], [p4, p5, p6], [p7]]), 'table': table}


def scrnaseq_qc(config, input, output):
    """Do QC of scrnaseq"""
    # Brennecke args
    brennecke_args = {'plot_height':600, 'plot_width': 800, 'alpha':
                      0.3, 'taptool_url': config['workflows.bio.scrnaseq']['report']['annotation_url'] + "@gene_id"}
    # Alignment stats
    d = {'align': _align_rseqc_plot(input.alignqc)}
    # rsem plots
    if input.rsemgenes:
        d.update({'rsem': plot_pca(input.rsemgenespca,
                                   config['workflows.bio.scrnaseq']['metadata'],
                                   input.rsemgenespca.replace(".pca.csv", ".pcaobj.pickle"))})
        # FIXME: Instead of re use list
        d['rsem'].update({'brennecke': scrnaseq_brennecke_plot(infile=input.rsemgenes, spikein_re=re.compile("^ERCC"),
                                                               index=["SM", "gene_id", "transcript_id(s)", "gene_name"],
                                                               **brennecke_args)})

    # rpkmforgenes plots
    if input.rpkmforgenes:
        d.update({'rpkmforgenes': plot_pca(input.rpkmforgenespca,
                                           config['workflows.bio.scrnaseq']['metadata'],
                                           input.rpkmforgenespca.replace(".pca.csv", ".pcaobj.pickle"))})
        d['rpkmforgenes'].update({'brennecke': scrnaseq_brennecke_plot(infile=input.rpkmforgenes, spikein_re=re.compile("^ERCC"),
                                                                       **brennecke_args)})
    
    d.update({'version' : config['_version'], 'config' : {'uri' : data_uri(input.globalconf), 'file' : input.globalconf}})
    d.update({'rulegraph': {'fig': input.rulegraph, 'uri': data_uri(input.rulegraph),
                            'target': 'scrnaseq_all'}})
    tp = Env.get_template('workflow_scrnaseq_qc.html')
    with open(output.html, "w") as fh:
        fh.write(static_html(tp, template_variables=d, css_raw=css_files, js_raw=js_files))


def scrnaseq_pca(config, input, output):
    """Run pca on expression values
    
    FIXME: generic enough to put in snakemakelib-core?
    """
    expr_long = pd.read_csv(input.expr)
    expr_long["TPM"] = [math.log2(x+1.0) for x in expr_long["TPM"]]
    expr = expr_long.pivot_table(columns="gene_id", values="TPM",
                                 index="SM")
    detected_genes = number_of_detected_genes(input.expr)
    pcaobj = pca(expr)
    pcares, loadings = pca_results(pcaobj, expr, metadata=config['workflows.bio.scrnaseq']['metadata'])
    if not detected_genes is None:
        pcares = pcares.join(detected_genes)
    with open(output.pca, "w") as fh:
        pcares.to_csv(fh)
    with open(output.loadings, "w") as fh:
        loadings.to_csv(fh)
    with open(output.pcaobj, "wb") as fh:
        pickle.dump(pcaobj, fh)

