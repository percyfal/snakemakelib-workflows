# Copyright (C) 2016 by Per Unneberg
from os.path import abspath, dirname, join
import logging
import shutil
import subprocess as sp
import pytest

logger = logging.getLogger(__name__)

SNAKEFILE=join(abspath(dirname(__file__)), "Snakefile")
SNAKEFILE_SETUP=join(abspath(dirname(__file__)), "Snakefile_setup")

# Setup 
@pytest.fixture(scope="module")
def data():
    output = sp.check_output(['snakemake', '-s', SNAKEFILE_SETUP], stderr=sp.STDOUT)
    

def test_snakemake(data):
    """Test snakemake command call"""
    output = sp.check_output(['snakemake', '-s', SNAKEFILE, '-l'], stderr=sp.STDOUT)
    assert "atacseq_correct_coordinates" in output.decode("utf-8")

