# Copyright (C) 2015 by Per Unneberg
import jinja2
import pandas as pd
from snakemake.report import data_uri
from snakemakelib.resources import bootstrap_css_files, bootstrap_js_files
from snakemakelib.plot.bokeh import static_html
from snakemakelib.plot.sklearn import plot_pca
from snakemakelib import SNAKEMAKELIB_TEMPLATES_PATH
from snakemakelib_workflows import SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH, all_versions
from snakemakelib.log import LoggerManager

smllogger = LoggerManager.getLogger(__name__)

__all__ = ['scrnaseq_save_align_rseqc_metrics', 'scrnaseq_qc']

def scrnaseq_save_align_rseqc_metrics(config, output, Align, RSeQC_readDistribution, RSeQC_geneBodyCoverage):
    """Helper function: join alignment results with rseqc results"""
    Align.read_aggregate_data('log', index_col="SM")
    df =  Align.aggregate_data['log'].reset_index()
    df["value"] = pd.to_numeric(df["value"], errors='coerce')
    df = df.pivot_table(values="value", index="SM", columns="name")
    try:
        RSeQC_readDistribution.read_aggregate_data('txt', index_col="SM")
        RSeQC_geneBodyCoverage.read_aggregate_data('txt', index_col="SM")
        df = df.join(RSeQC_readDistribution.aggregate_data["txt"].reset_index().pivot_table(columns="Group", values="Tag_count", index="SM"))
        df = df.join(RSeQC_geneBodyCoverage.aggregate_data["txt"])
    except:
        smllogger.warning("rseqc_read_distribution and/or rseqc_geneBodyCoverage not run; only saving alignment results")
    # Remember: ColumnDataSource column names cannot include spaces or %
    df.columns = [x.replace(" ", "_").replace("%", "PCT") for x in df.columns]
    df.to_csv(output.csv)


# Template environment
loader = jinja2.FileSystemLoader([SNAKEMAKELIB_TEMPLATES_PATH,
                                  SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH])
Env = jinja2.Environment(loader=loader)


def scrnaseq_qc(config, input, output, results=None, rsem=None, rpkmforgenes=None, **kwargs):
    """Do QC of scrnaseq"""
    # Collect results - subset by samples if applicable
    results.read_aggregate_data()
    results.filter_aggregate_data('alignrseqc', 'SM', config["samples"])

    taptool_url = None
    if not config['scrnaseq.workflow']['report']['annotation_url'] is None:
        taptool_url = config['scrnaseq.workflow']['report']['annotation_url'] + "@gene_id"
        
    # Brennecke args
    # brennecke_args = {'plot_height':600, 'plot_width': 800, 'alpha':
    #                   0.3, 'taptool_url': config['scrnaseq.workflow']['report']['annotation_url'] + "@gene_id"}
    # Alignment stats
    d = {'align': {'fig': results.plot('alignrseqc')[0]['fig'], 'table': results.plot('alignrseqc')[0]['table']}}
    # rsem plots
    if rsem.run:
        d.update({'rsem': plot_pca(rsem.targets['pca'][0],
                                   config['scrnaseq.workflow']['metadata'],
                                   rsem.targets['pca'][0].replace(".pca.csv", ".pcaobj.pickle"),
                                   taptool_url= taptool_url)})
    #     # FIXME: Instead of re use list
    #     # d['rsem'].update({'brennecke': scrnaseq_brennecke_plot(infile=input.rsemgenes, spikein_re=re.compile("^ERCC"),
    #     #                                                        index=["SM", "gene_id", "transcript_id(s)", "gene_name"],
    #     #                                                        **brennecke_args)})

    # rpkmforgenes plots
    if rpkmforgenes.run:
        d.update({'rpkmforgenes': plot_pca(rpkmforgenes.targets['pca'][0],
                                           config['scrnaseq.workflow']['metadata'],
                                           rpkmforgenes.targets['pca'][0].replace(".pca.csv", ".pcaobj.pickle"),
                                           taptool_url= taptool_url)})


    d.update({'version' : all_versions(), 'config' : {'uri' : data_uri(input.globalconf), 'file' : input.globalconf}})
    d.update({'rulegraph': {'fig': input.rulegraph, 'uri': data_uri(input.rulegraph),
                            'target': 'scrnaseq_all'}})
    tp = Env.get_template('workflow_scrnaseq_qc.html')
    with open(output.html, "w") as fh:
        fh.write(static_html(tp, template_variables=d, css_raw=bootstrap_css_files, js_raw=bootstrap_js_files))
