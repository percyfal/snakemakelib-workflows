# Copyright (C) 2015 by Per Unneberg
import pickle
from snakemakelib.applications import number_of_detected_genes

__all__ = ['scrnaseq_pca']

def scrnaseq_pca(config, input, output, X, method="PCA", **kwargs):
    """WIP: Run pca on expression values.

    Args:
      X: nxp gene expression matrix, where n=samples, p=features (genes)


    FIXME: generic enough to put in snakemakelib-core?
    """
    #kwargs = {}
    if method == "sparsePCA":
        ### Tuning parameter should be chosen from cross validation
        from sklearn.decomposition import sparsePCA as PCA
    else:
        from sklearn.decomposition import PCA
    
    # Set multiindex on columns
    n_genes = expr_long.groupby(["SM"]).size()[0]
    tuples = [(k,v) for k,v in zip(list(expr_long["gene_id"][0:n_genes]), list(expr_long["gene_name"][0:n_genes]))]
    index = pd.MultiIndex.from_tuples(tuples, names=['gene_id', 'gene_name'])
    pcaobj = PCA(n_components=10, whiten=False, **kwargs)
    pcaobj.fit(expr)
    pcaobj.gene_id = index.get_level_values('gene_id')
    pcaobj.gene_name = index.get_level_values('gene_name')
    pcares = pd.DataFrame(pcaobj.fit(expr).transform(expr))
    if not expr.index.name is None:
        pcares.index = expr.index
    if not config['scrnaseq.workflow']['metadata'] is None:
        try:
            md = pd.read_csv(config['scrnaseq.workflow']['metadata'], index_col=expr.index.name)
        except ValueError:
            raise Exception("expression index name '{name}' not present in '{metadata}'; make sure '{name}' column exists in order to merge pca results with metadata".format(name=expr.index.name, metadata=config['scrnaseq.workflow']['metadata']))
        pcares = pcares.join(md)
    detected_genes = number_of_detected_genes(expr_long)
    if not detected_genes is None:
        pcares = pcares.join(detected_genes)
    with open(output.pca, "w") as fh:
        pcares.to_csv(fh)
    with open(output.pcaobj, "wb") as fh:
        pickle.dump(pcaobj, fh)


