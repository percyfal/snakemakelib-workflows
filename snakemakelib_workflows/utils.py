# Copyright (C) 2015 by Per Unneberg
import snakemake_rules._version
import snakemakelib._version
import snakemakelib_workflows._version

def all_versions():
    return {'_snakemake_rules_version': snakemake_rules._version.get_versions(),
            '_snakemakelib_version': snakemakelib._version.get_versions(),
            '_snakemakelib_workflows_version': snakemakelib_workflows._version.get_versions()}
