# Copyright (C) 2015 by Per Unneberg
import pickle
import math
import pandas as pd

__all__ = ['scrnaseq_pca_all']

def scrnaseq_pca_all(expr, pca_output_file, pcaobj_pickle_file, metadata=None, pca_quant="TPM", **kwargs):
    """Wrapper for running pca and feature selection.
    
    Args:
      expr (str): input file name
      pca_output_file (str): output file name
      pcaobj_pickle_file (str): output file name for pickle serialization
    
    """
    expr_long = pd.read_csv(expr)
    expr_long["TPM"] = [math.log2(x+1.0) for x in expr_long["TPM"]]
    expr_long["FPKM"] = [math.log2(x+1.0) for x in expr_long["FPKM"]]
    X = expr_long.pivot_table(columns="gene_id", values=pca_quant,
                              index="SM")
    try:
        kwargs['labels'] = expr_long["gene_name"][0:X.shape[1]]
    except:
        print("Failed to set labels")
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
    #kwargs = {}
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


