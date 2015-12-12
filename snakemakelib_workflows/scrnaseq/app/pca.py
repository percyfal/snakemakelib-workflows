# Copyright (C) 2015 by Per Unneberg
import pickle
import math
import pandas as pd
from snakemakelib.log import LoggerManager

smllogger = LoggerManager.getLogger(__name__)

__all__ = ['scrnaseq_pca_all']

def scrnaseq_pca_all(expr, pca_output_file, pcaobj_pickle_file,
                     metadata=None, pca_quant="TPM",
                     screen_n=2000, **kwargs):
    """Wrapper for running pca and feature selection.
    
    Args:
      expr (str): input file name
      pca_output_file (str): output file name
      pcaobj_pickle_file (str): output file name for pickle serialization
      metadata (str): metadata file name
      screen_n (int): number of features to keep based on variance
      
    Returns:
      None - results are saved to given output files
    """
    samples = kwargs.pop("samples", None)
    expr_long = pd.read_csv(expr)
    if not samples is None:
        expr_long = expr_long.loc[expr_long.SM.isin(samples), :]
    if "spikein" in expr_long.columns:
        expr_long = expr_long.loc[expr_long["spikein"]==0,]
    expr_long["TPM"] = [math.log2(x+1.0) for x in expr_long["TPM"]]
    expr_long["FPKM"] = [math.log2(x+1.0) for x in expr_long["FPKM"]]
    X = expr_long.pivot_table(columns="gene_id", values=pca_quant,
                              index="SM")
    if not screen_n is None:
        smllogger.info("Only using top {} variable features", screen_n)
        sorted_vars = [i[0] for i in sorted(enumerate(list(X.var())), key=lambda x:x[1], reverse=True)]
        X = X.iloc[:, sorted_vars[:screen_n]]
    try:
        df = expr_long[expr_long["gene_id"].isin(X.columns.values)].loc[:, ["gene_id", "gene_name"]]
        kwargs['labels'] = {k:v for (k,v) in zip(df["gene_id"], df["gene_name"])}
    except:
        smllogger.warning("Failed to set labels on gene_name")
    pcares, pcaobj = scrnaseq_pca(X, metadata=metadata, **kwargs)
    detected_genes = expr_long.groupby(kwargs.get("groupby", 'SM')).agg(lambda x: sum(x > kwargs.get('cutoff', 1)))
    if not detected_genes is None:
        pcares = pcares.join(detected_genes)
    with open(pca_output_file, "w") as fh:
        pcares.to_csv(fh)
    with open(pcaobj_pickle_file, "wb") as fh:
        pickle.dump(pcaobj, fh)


def scrnaseq_pca(X, method="PCA", labels=None, metadata=None, **kwargs):
    """WIP: Run pca on expression values.

    Args:
      X (DataFrame): nxp gene expression matrix, where n=samples, p=features (genes)
      method (str): what pca method to use
      labels (list): additional feature labels (e.g. matrix X has gene ids, whereas labels could be gene names)
      metadata (str): metadata file name for annotation


    FIXME: generic enough to put in snakemakelib-core?
    """
    if method == "sparsePCA":
        ### Tuning parameter should be chosen from cross validation
        from sklearn.decomposition import sparsePCA as PCA
    else:
        from sklearn.decomposition import PCA

    # Set multiindex on columns
    pcaobj = PCA(n_components=10, whiten=False, **kwargs)
    pcaobj.fit(X)
    pcaobj.features = X.columns.values
    if not labels is None:
        pcaobj.labels = labels
    pcares = pd.DataFrame(pcaobj.fit(X).transform(X))
    if not X.index.name is None:
        pcares.index = X.index
    if not metadata is None:
        try:
            md = pd.read_csv(metadata, index_col=X.index.name)
        except ValueError:
            raise Exception("expression index name '{name}' not present in '{metadata}'; make sure '{name}' column exists in order to merge pca results with metadata".format(name=X.index.name, metadata=metadata))
        pcares = pcares.join(md)
    return pcares, pcaobj


