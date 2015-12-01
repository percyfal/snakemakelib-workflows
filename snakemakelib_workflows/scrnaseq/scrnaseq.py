# Copyright (C) 2015 by Per Unneberg
import re
import math
import pandas as pd
import jinja2
import numpy as np
import pickle
from collections import OrderedDict
from snakemake.report import data_uri
from snakemakelib.odo.utils import annotate_df
from snakemakelib.odo import star, rseqc
from snakemakelib import SNAKEMAKELIB_TEMPLATES_PATH
from snakemakelib.resources import bootstrap_css_files, bootstrap_js_files
from snakemakelib.plot.bokeh import static_html
from snakemakelib_workflows import SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH
from bokeh.models import ColumnDataSource, TableColumn, DataTable, HoverTool, BoxSelectTool
from bokeh.plotting import figure, gridplot, output_file, show
from snakemakelib.plot.sklearn import plot_pca
from snakemakelib.statistics import pca, pca_results
from snakemakelib.applications import number_of_detected_genes, scrnaseq_brennecke_plot
from snakemakelib.graphics import dotplot, tooltips


DEFAULT_TOOLS = "pan,wheel_zoom,box_zoom,box_select,lasso_select,resize,reset,save,hover"

# Template environment
loader = jinja2.FileSystemLoader([SNAKEMAKELIB_TEMPLATES_PATH,
                                  SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH])
Env = jinja2.Environment(loader=loader)


def _save_align_rseqc_metrics(config, output, Align, RSeQC_readDistribution, RSeQC_geneBodyCoverage):
    """Join alignment results with rseqc results"""
    Align.read_aggregate_data('log', index_col="SM")
    RSeQC_readDistribution.read_aggregate_data('txt', index_col="SM")
    RSeQC_geneBodyCoverage.read_aggregate_data('txt', index_col="SM")
    df =  Align.aggregate_data['log'].reset_index()
    df["value"] = pd.to_numeric(df["value"], errors='coerce')
    df = df.pivot_table(values="value", index="SM", columns="name")
    df = df.join(RSeQC_readDistribution.aggregate_data["txt"].reset_index().pivot_table(columns="Group", values="Tag_count", index="SM"))
    df = df.join(RSeQC_geneBodyCoverage.aggregate_data["txt"])
    # Remember: ColumnDataSource column names cannot include spaces or %
    df.columns = [x.replace(" ", "_").replace("%", "PCT") for x in df.columns]
    df.to_csv(output.csv)
    

def _results_plot_alignrseqc(df, **kwargs):
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

    kwargs = {'plot_width': 400, 'plot_height': 400,
              'title_text_font_size': "16pt",
              'x_axis_label': 'Sample',
              #'x_axis_label_text_font_size': '12pt',
              #'x_major_label_orientation': np.pi/3,
              'y_axis_label': 'Reads',
              #'y_axis_label_text_font_size': '12pt',
              #'y_major_label_orientation': np.pi/3}
              }    
    # Input reads
    p1 = dotplot(
        df=source,
        title="Number of input reads", tools=DEFAULT_TOOLS, 
        x="SM", y="Number_of_input_reads",
        **dict(kwargs, **{'x_range': list(df.index), 'y_axis_type': "log"}))
    tooltips(p1, HoverTool, [('Sample', '@SM'),
                             ('Reads', '@Number_of_input_reads')])
              
    # Uniquely mapping
    kwargs['x_axis_label'] = 'Percent'
    p2 = dotplot(
        df=source,
        tools=DEFAULT_TOOLS, title="Uniquely mapping reads",
        x="SM", y="Uniquely_mapped_reads_PCT",
        **dict(kwargs, **{'x_range': p1.x_range, 'y_range': [0, 100]})
    )
    tooltips(p2, HoverTool, [('Sample', '@SM'),
                             ('Pct_mapped', '@Uniquely_mapped_reads_PCT')])
    
    # Unmapped
    p3 = dotplot(
        df=source,
        tools=DEFAULT_TOOLS, title="Unmapped reads",
        x="SM", y="PCT_of_reads_unmapped",
        **dict(kwargs, **{'x_range': p1.x_range, 'y_range': [0, 100]})
    )
    tooltips(p3, HoverTool, [('Sample', '@SM'),
                             ('Pct_unmapped', '@PCT_of_reads_unmapped')])
              
    # Mismatch/indel rate
    p4 = figure(title="Mismatch and indel rates",
                x_range=p1.x_range,
                tools=DEFAULT_TOOLS,
                **kwargs)
    p4.circle(x="SM", y="Mismatch_rate_per_base,_PCT", source=source, legend="Mismatch")
    p4.circle(x="SM", y="Insertion_rate_per_base", source=source, legend="Insertion", color="red")
    p4.circle(x="SM", y="Deletion_rate_per_base", source=source, legend="Deletion", color="green")
    #xaxis(p4, **kwxaxis)
    #yaxis(p4, axis_label="Percent", **kwyaxis)
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
    p5 = dotplot(
        tools=DEFAULT_TOOLS, title="Mismatch/indel sum",
        x="SM", y="mismatch_sum", df=source,
        **dict(kwargs, **{'x_range': p1.x_range})
    )
    tooltips(p5, HoverTool, [('Sample', '@SM'),
                             ('Mismatch/indel rate per base',
                              '@mismatch_sum'), ])
    select_tool = p5.select(dict(type=BoxSelectTool))
    select_tool.dimensions = ['width']
    
    # Fraction reads mapping to 10% right-most end
    p6 = dotplot(
        tools=DEFAULT_TOOLS, title="Tags mapping to exons",
        x="SM", y="ExonMap_PCT", df=source,
        **dict(kwargs, **{'x_range': p1.x_range})
    )
    tooltips(p6, HoverTool, [('Sample', '@SM'),
                             ('ExonMap (%)', '@ExonMap_PCT'), ])
    
    # Fraction reads mapping to 10% right-most end
    p7 = dotplot(
        tools=DEFAULT_TOOLS, title="Reads mapping to 3' end",
        x="SM", y="three_prime_map", df=source,
        **dict(kwargs, **{'x_range': p1.x_range})
    )
    tooltips(p7, HoverTool, [('Sample', '@SM'),
                             ("3' map", '@three_prime_map'), ])
    
    return {'fig': gridplot([[p1, p2, p3], [p4, p5, p6], [p7]]), 'table': table}


def scrnaseq_qc(config, input, output, results=None, **kwargs):
    """Do QC of scrnaseq"""
    # Collect results
    results.read_aggregate_data()
    
    # Brennecke args
    brennecke_args = {'plot_height':600, 'plot_width': 800, 'alpha':
                      0.3, 'taptool_url': config['workflows.bio.scrnaseq']['report']['annotation_url'] + "@gene_id"}
    # Alignment stats
    d = {'align': {'fig': results.plot('alignrseqc')[0]['fig'], 'table': results.plot('alignrseqc')[0]['table']}}
    # rsem plots
    # if input.rsemgenes:
    #     d.update({'rsem': plot_pca(input.rsemgenespca,
    #                                config['settings']['metadata'],
    #                                input.rsemgenespca.replace(".pca.csv", ".pcaobj.pickle"),
    #                                taptool_url= config['workflows.bio.scrnaseq']['report']['annotation_url'] + "@gene_id")})
    #     # FIXME: Instead of re use list
    #     # d['rsem'].update({'brennecke': scrnaseq_brennecke_plot(infile=input.rsemgenes, spikein_re=re.compile("^ERCC"),
    #     #                                                        index=["SM", "gene_id", "transcript_id(s)", "gene_name"],
    #     #                                                        **brennecke_args)})

    # # rpkmforgenes plots
    # if input.rpkmforgenes:
    #     d.update({'rpkmforgenes': plot_pca(input.rpkmforgenespca,
    #                                        config['settings']['metadata'],
    #                                        input.rpkmforgenespca.replace(".pca.csv", ".pcaobj.pickle"),
    #                                        taptool_url= config['workflows.bio.scrnaseq']['report']['annotation_url'] + "@gene_id")})
    
    # d.update({'version' : config['_version'], 'config' : {'uri' : data_uri(input.globalconf), 'file' : input.globalconf}})
    # d.update({'rulegraph': {'fig': input.rulegraph, 'uri': data_uri(input.rulegraph),
    #                         'target': 'scrnaseq_all'}})
    tp = Env.get_template('workflow_scrnaseq_qc.html')
    with open(output.html, "w") as fh:
        print(output.html)
        fh.write(static_html(tp, template_variables=d, css_raw=bootstrap_css_files, js_raw=bootstrap_js_files))


def scrnaseq_pca(config, input, output):
    """Run pca on expression values
    
    FIXME: generic enough to put in snakemakelib-core?
    """
    expr_long = pd.read_csv(input.expr)
    expr_long["TPM"] = [math.log2(x+1.0) for x in expr_long["TPM"]]
    expr = expr_long.pivot_table(columns="gene_id", values="TPM",
                                 index="SM")
    # Set multiindex on columns
    n_genes = expr_long.groupby(["SM"]).size()[0]
    tuples = [(k,v) for k,v in zip(list(expr_long["gene_id"][0:n_genes]), list(expr_long["gene_name"][0:n_genes]))]
    index = pd.MultiIndex.from_tuples(tuples, names=['gene_id', 'gene_name'])
    pcaobj = pca(expr)
    pcaobj.gene_id = index.get_level_values('gene_id')
    pcaobj.gene_name = index.get_level_values('gene_name')
    pcares = pca_results(pcaobj, expr)
    if not config['settings']['metadata'] is None:
        try:
            md = pd.read_csv(config['settings']['metadata'], index_col=expr.index.name)
        except ValueError:
            raise Exception("expression index name '{name}' not present in '{metadata}'; make sure '{name}' column exists in order to merge pca results with metadata".format(name=expr.index.name, metadata=config['settings']['metadata']))
        pcares = pcares.join(md)
    detected_genes = number_of_detected_genes(expr_long)
    if not detected_genes is None:
        pcares = pcares.join(detected_genes)
    with open(output.pca, "w") as fh:
        pcares.to_csv(fh)
    with open(output.pcaobj, "wb") as fh:
        pickle.dump(pcaobj, fh)

