# Copyright (C) 2015 by Per Unneberg
import pandas as pd
from blaze import Data, append, odo, DataFrame
from blaze import concat
from snakemakelib.odo import cutadapt

def _collect_cutadapt_metrics(targets, parser):
    first = True
    for t in targets:
        m = parser.parse(t)
        if first:
            df = odo(t, DataFrame)
            df["sample"] = m['SM']
            df["run"] = m['PU']
            first = False
        else:
            df2 = odo(t, DataFrame)
            df2["sample"] = m['SM']
            df2["run"] = m['PU']
            df = pd.concat([df, df2])

