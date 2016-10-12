.. _snakemakelib_workflows.scrnaseq:

``snakemakelib_workflows.scrnaseq.app``
===========================================

.. automodule:: snakemakelib_workflows.scrnaseq.app

``graphics``
-------------

.. autofunction:: snakemakelib_workflows.scrnaseq.app.graphics.scrnaseq_results_plot_alignrseqc


``hooks``
----------

.. autofunction:: snakemakelib_workflows.scrnaseq.app.hooks.scrnaseq_annotate_genes_hook
.. autofunction:: snakemakelib_workflows.scrnaseq.app.hooks.scrnaseq_annotate_isoforms_hook
.. autofunction:: snakemakelib_workflows.scrnaseq.app.hooks.scrnaseq_rseqc_genebody_coverage_hook
.. autofunction:: snakemakelib_workflows.scrnaseq.app.hooks.scrnaseq_rseqc_read_distribution_hook
.. autofunction:: snakemakelib_workflows.scrnaseq.app.hooks.scrnaseq_star_align_postprocessing_hook


``pca``
--------

.. autofunction:: snakemakelib_workflows.scrnaseq.app.pca.scrnaseq_pca_all
.. autofunction:: snakemakelib_workflows.scrnaseq.app.pca.scrnaseq_pca


``report``
------------

.. autofunction:: snakemakelib_workflows.scrnaseq.app.scrnaseq_save_align_rseqc_metrics
.. autofunction:: snakemakelib_workflows.scrnaseq.app.scrnaseq_qc


``technicalnoise``
-------------------

.. autoclass:: snakemakelib_workflows.scrnaseq.app.ScrnaseqTechnicalNoise
.. autofunction:: snakemakelib_workflows.scrnaseq.app.scrnaseq_brennecke_plot

``utils``
----------

.. autofunction:: snakemakelib_workflows.scrnaseq.app.utils.get_extra_ref_ids
