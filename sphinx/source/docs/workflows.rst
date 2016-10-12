About
------

The workflows have been derived from actual work on project data. The
goal has been to extract components that are general enough to be
reused on similar data sets. One design goal has been to provide
options that take into account differences in data production, such as
single-end versus paired-end. However, this flexibility comes at the
cost of maintenance and debugging being more difficult.


General comments
----------------

Workflow list
--------------

.. toctree::
   :maxdepth: 1

   workflows/atacseq
   workflows/scrnaseq

Known issues
-------------

See `github issues
<https://github.com/percyfal/snakemakelib-workflows/issues>`_.

Troubleshooting
----------------

For specific workflow-related problems, see the workflow
documentation. Some general pieces of advice come to mind though.

1. When a rule fails, run that rule directly. Should the error
   information be insufficient, look at the source code of the rule
   for more clues.

