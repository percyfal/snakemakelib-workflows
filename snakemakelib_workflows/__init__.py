# Copyright (c) 2013 Per Unneberg
import os
from jinja2 import Environment, PackageLoader
import logging
logger = logging.getLogger(__name__)

__import__('pkg_resources').declare_namespace(__name__)

from ._version import get_versions
__version__ = get_versions()['version']
del get_versions

SNAKEMAKELIB_WORKFLOWS_PATH = os.path.dirname(__file__)
SNAKEMAKELIB_WORKFLOWS_TEMPLATES_PATH = os.path.join(SNAKEMAKELIB_WORKFLOWS_PATH, "_templates")

# Template path and templates
SmlTemplateEnv = Environment(loader = PackageLoader("snakemakelib_workflows", "_templates"))
SmlTemplateEnv.globals.update(zip=zip)


