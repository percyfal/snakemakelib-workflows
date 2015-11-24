# Copyright (C) 2015 by Per Unneberg
import logging
logger = logging.getLogger(__name__)
from os.path import join
from jinja2 import Environment, PackageLoader
from snakemakelib import SNAKEMAKELIB_PATH

# Template path and templates
SmlTemplateEnv = Environment(loader = PackageLoader("snakemakelib", "_templates"))
SmlTemplateEnv.globals.update(zip=zip)

# Static css files
css_files = [join(SNAKEMAKELIB_PATH, 'static', 'basic.css')]

