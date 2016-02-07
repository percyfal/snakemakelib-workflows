# Copyright (c) 2014 Per Unneberg
# Modelled on bokeh setup script
# --------------------------------------------------
# Imports
# --------------------------------------------------

from __future__ import print_function

# stdlib
import os
from setuptools import setup
from os.path import realpath, dirname, relpath, join

# Extensions
import versioneer

# --------------------------------------------------
# globals and constants
# --------------------------------------------------

ROOT = dirname(realpath(__file__))

# --------------------------------------------------
# classes and functions
# --------------------------------------------------

package_data = []

def package_path(path, filters=()):
    if not os.path.exists(path):
        raise RuntimeError("packaging non-existent path: %s" % path)
    elif os.path.isfile(path):
        package_data.append(relpath(path, 'snakemakelib_workflows'))
    else:
        for path, dirs, files in os.walk(path):
            path = relpath(path, 'snakemakelib_workflows')
            for f in files:
                if not filters or f.endswith(filters):
                    package_data.append(join(path, f))

rule_suffixes = ('.rules', '.rule')
workflow_suffixes = ('.workflow')
                    
package_path(join(ROOT, 'snakemakelib_workflows'), rule_suffixes)
package_path(join(ROOT, 'snakemakelib_workflows'), workflow_suffixes)
package_path(join(ROOT, 'snakemakelib_workflows', '_templates'))
scripts = []

REQUIRES = [
    'snakemake>=3.5.3',
    'snakemake_rules',
    'snakemakelib_core',
]

try:
    # Hack for readthedocs
    if not 'readthedocs' in os.path.dirname(os.path.realpath(__file__)):
        pass
    else:
        print("readthedocs in path name; assuming we're building docs @readthedocs")
        REQUIRES.append('sphinx-bootstrap-theme')
except:
    pass

# Integrating pytest with setuptools: see
# https://pytest.org/latest/goodpractises.html#integrating-with-distutils-python-setup-py-test
from distutils.core import setup, Command
# you can also import from setuptools

class PyTest(Command):
    user_options = []
    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        import subprocess
        import sys
        errno = subprocess.call([sys.executable, 'runtests.py'])
        raise SystemExit(errno)

_version = versioneer.get_version()
_cmdclass = versioneer.get_cmdclass()
_cmdclass.update({'test': PyTest})
setup(
    name="snakemakelib-workflows",
    version=_version,
    cmdclass=_cmdclass,
    author="Per Unneberg",
    author_email="per.unneberg@scilifelab.se",
    description="Snakemake rule library",
    license="MIT",
    url="http://github.com/percyfal/snakemakelib-workflows",
    scripts=scripts,
    packages=[
        'snakemakelib_workflows',
        'snakemakelib_workflows.atacseq',
        'snakemakelib_workflows.atacseq.app',
        'snakemakelib_workflows.scrnaseq',
        'snakemakelib_workflows.scrnaseq.app',
    ],
    # namespace_packages = [
    #     'snakemakelib',
    #     'snakemakelib.rules',
    # ],
    package_data={'snakemakelib_workflows': package_data},
    install_requires=REQUIRES,
)
