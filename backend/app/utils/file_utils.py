import os
from pathlib import Path


def creer_dossier_si_absent(chemin: str):
    Path(chemin).mkdir(parents=True, exist_ok=True)


def extension_autorisee(filename: str) -> bool:
    extensions = {".fasta", ".fa", ".fna", ".txt"}

    _, extension = os.path.splitext(filename.lower())

    return extension in extensions