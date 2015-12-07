# Copyright (C) 2015 by Per Unneberg
import numpy as np
from bokeh.models import ColumnDataSource, TableColumn, DataTable, HoverTool, BoxSelectTool
from bokeh.plotting import figure, gridplot
from snakemakelib.graphics import dotplot, tooltips

__all__ = ['scrnaseq_results_plot_alignrseqc']

DEFAULT_TOOLS = "pan,wheel_zoom,box_zoom,box_select,lasso_select,resize,reset,save,hover"

def scrnaseq_results_plot_alignrseqc(df, **kwargs):
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
              'x_axis_label_text_font_size': '12pt',
              'x_major_label_orientation': np.pi/3,
              'y_axis_label': 'Reads',
              'y_axis_label_text_font_size': '12pt',
              'y_major_label_orientation': np.pi/3
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
    kwargs['y_axis_label'] = 'Percent'
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
    p4 = dotplot(
        df=source,
        tools=DEFAULT_TOOLS,
        title="Mismatch/indel rate",
        x="SM",
        y=[
            "Mismatch_rate_per_base,_PCT",
            "Insertion_rate_per_base",
            "Deletion_rate_per_base"
        ],
        **dict(kwargs, **{'x_range': p1.x_range, 'y_range': [0, 1], 'color': ["blue", "red", "green"]})
    )
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

