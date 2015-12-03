# Copyright (C) 2015 by Per Unneberg
import numpy as np
from bokeh.models import ColumnDataSource
import pandas as pd
from scipy.stats import chi2
import statsmodels.api as sm
from snakemakelib.applications import rnaseq
from snakemakelib.graphics import scatter
from bokeh.models import HoverTool, OpenURL, TapTool

__all__ = ['ScrnaseqTechnicalNoise', 'scrnaseq_brennecke_plot']


class ScrnaseqTechnicalNoise(object):
    def __init__(self, df, df_spikein, quantile=.95, cutoff=.3,
                 **kwargs):
        self._data = pd.concat([df, df_spikein], keys=["gene",
                                                       "spikein"])
        self._data.index.names = ["spikein"] + df.index.names
        self._data_norm = self._data
        self.quantile = quantile
        self.cutoff = cutoff


    def _calc_size_factors(self):
        return pd.Series({
            g[0]:rnaseq.estimate_size_factors_for_matrix(g[1]) for
            g in self._data.groupby(level="spikein")
        })


    def _calc_min_mean_for_fit(self):
        self._means = self._data_norm.mean(axis=1)
        self._vars = self._data_norm.var(axis=1)
        self._cv2 = self._vars / (self._means ** 2)
        self._min_mean_for_fit = self._means.loc['gene', :][(self._cv2.loc['gene', :] > self.cutoff)].dropna().quantile(q=self.quantile)


    @property
    def size_factors(self):
        return self._size_factors


    @property
    def coefficients(self):
        return self._coef


    def fit(self):
        self._size_factors = self._calc_size_factors()
        self._data_norm = pd.concat([
            df / self._size_factors[spikein]
            for spikein, df in self._data.groupby(level="spikein")
        ])
        self._calc_min_mean_for_fit()
        use_for_fit = self._means.loc['gene', :] > self._min_mean_for_fit
        X = 1/self._means.loc['gene', :][use_for_fit]
        X = sm.add_constant(X)
        X.columns = ['a0', 'a1tilde']
        gamma_results = sm.GLM(self._cv2.loc['gene', :][use_for_fit], X, family = sm.families.Gamma()).fit()
        self._xi = (1 / self.size_factors['gene']).mean()
        coef = gamma_results.params
        coef['a1'] = coef['a1tilde'] - self._xi
        self._coef = coef
        self._fitted_data = pd.concat([self._means, self._cv2], axis=1)
        self._fitted_data.columns = ["normalized mean", "cv2"]


def scrnaseq_brennecke_plot(infile, spikein_re, counts="TPM",
                           index=["SM", "gene_id", "transcript_id",
                                  "gene_name"], unstack="SM",
                            tooltips=["gene_name", "gene_id"],
                            taptool_url=None, **kwargs):
    """Make the brennecke plot"""
    df_raw = pd.read_csv(infile, index_col=0)
    df_raw = df_raw.set_index(index)
    df = df_raw[counts].unstack(level=unstack)
    # Partition data set inte genes and spikeins
    i_spikes = df.index.map(lambda s: bool(spikein_re.search(s[0])))
    # Do the error modelling
    noise = ScrnaseqTechnicalNoise(df[~i_spikes], df[i_spikes])
    noise.fit()
    # Plot the results
    fig, source = scatter(y="cv2", x="normalized mean",
                          df=noise._fitted_data.dropna().reset_index(),
                          x_axis_type="log", y_axis_type="log",
                          x_axis_label="Normalized mean",
                          y_axis_label="Cv2",
                          plot_height=kwargs.pop("plot_height", 400),
                          plot_width=kwargs.pop("plot_width", 400),
                          color=kwargs.pop("color", "spikein"),
                          **kwargs)

    # Add confidence lines
    xg = [10**x for x in np.linspace(-2.0, 6.0, num=1000)]
    y = (noise._xi + noise.coefficients["a1"])/xg + noise.coefficients["a0"]
    fig.line(xg, y, color="red", line_width=3)
    # Add chi2 stats
    chi2df = df.shape[1] - 1
    fig.line(xg, y * chi2.ppf(.975, chi2df) / chi2df, color="red", line_width=3, line_dash=[4,4])
    fig.line(xg, y * chi2.ppf(.025, chi2df) / chi2df, color="red", line_width=3, line_dash=[4,4])

    # Add default tooltip displaying index names
    fig.add_tools(HoverTool(tooltips=[(i, "@{}".format(i)) for i in tooltips]))
    # Add taptool url if present
    if taptool_url:
        fig.add_tools(TapTool(callback=OpenURL(url=taptool_url)))
    return fig
