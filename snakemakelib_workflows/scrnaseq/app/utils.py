# Copyright (C) 2015 by Per Unneberg
import os
from Bio import SeqIO

__all__ = ['get_extra_ref_ids']


def get_extra_ref_ids(extra_refs):
    """Get the extra ref identifiers

    Args:
      extra_refs (list): list of file names (typically defined in configuration key config['bio.ngs.settings']['db']['extra_ref'])

    Returns:
      ids (list): list of identifiers
    """
    extmap = {".fa":"fasta", ".fasta":"fasta"}
    ids = []
    for f in extra_refs:
        _, ext = os.path.splitext(f)
        fh = open(f, "rU")
        ids += [rec.id for rec in SeqIO.parse(fh, extmap[ext])]
    return ids
