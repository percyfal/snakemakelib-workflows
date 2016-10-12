# Copyright (C) 2015 by Per Unneberg
import snakemakelib_workflows._version
try:
    import snakemake_rules._version
    import snakemakelib._version
except:
    pass

UNKNOWN = {'error': None, 'dirty': False, 'full-revisionid': None, 'version': None}
def all_versions():
    try:
        versions = {'_snakemake_rules_version': snakemake_rules._version.get_versions(),
                    '_snakemakelib_version': snakemakelib._version.get_versions(),
                    '_snakemakelib_workflows_version': snakemakelib_workflows._version.get_versions()}
    except:
        versions = {'_snakemake_rules_version': UNKNOWN,
                    '_snakemakelib_version': UNKNOWN,
                    '_snakemakelib_workflows_version': snakemakelib_workflows._version.get_versions()}
    return versions
