# Copyright (C) 2015 by Per Unneberg
import jinja2
from snakemake.report import data_uri
from snakemakelib import SNAKEMAKELIB_TEMPLATES_PATH
from snakemakelib_workflows import SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH
from snakemakelib.resources import css_files
from snakemakelib.plot.bokeh import static_html

__all__ = ['aggregate_results', 'atacseq_summary']


# Template environment
loader = jinja2.FileSystemLoader([SNAKEMAKELIB_TEMPLATES_PATH,
                                  SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH])
Env = jinja2.Environment(loader=loader)

def aggregate_results(res):
    """Wrapper for aggregating and saving results for relevant applications"""
    res.aggregate().save_aggregate_data()

def atacseq_summary(config, input, output, Cutadapt, Qualimap,
                    MarkDuplicates, InsertMetrics, AlignmentMetrics):
    """Make atacseq summary"""
    # Dictionary of figures
    d = {}
    Cutadapt.read_aggregate_data()
    d.update({'cutadapt': {'fig': Cutadapt.plot('cutadapt')[0]}})

    Qualimap.read_aggregate_data()
    d.update({'qualimap': {'fig': {'globals': Qualimap.plot("Globals")[0],
                                   'coverage_per_contig': Qualimap.plot("Coverage_per_contig")[0]}}})
    
    InsertMetrics.read_aggregate_data()
    plist = [InsertMetrics.plot('metrics')[0]] + [x for sublist in InsertMetrics.plot("hist")[0].children for x in sublist]
    gp = gridplot([plist[i:i+3] for i in range(0, len(plist), 3)])
    d.update({'picard': {'InsertMetrics': {'atacseq' : {'fig': gp}}}})

    MarkDuplicates.read_aggregate_data()
    d['picard'].update({'DuplicationMetrics': {'atacseq':
                                               {'fig':
                                                gridplot([[MarkDuplicates.plot('metrics')[0],
                                                           MarkDuplicates.plot('hist')[0]]])}}})

    d.update({'rulegraph' : {'fig' : input.rulegraph, 'uri': data_uri(input.rulegraph),
                             'target' : 'atacseq_all'}})

    # Write the resulting html
    tp = Env.get_template('workflow_atacseq_qc.html')
    with open(output.html, "w") as fh:
        fh.write(static_html(tp, template_variables=d, css_raw=css_files))
            
