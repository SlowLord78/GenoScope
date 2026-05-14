from io import StringIO
from Bio import SeqIO


async def analyser_fichiers_fasta(files):
    sequences = []

    for fichier in files:
        contenu = await fichier.read()
        texte = contenu.decode("utf-8", errors="ignore")

        if not texte.strip().startswith(">"):
            raise ValueError(f"Le fichier {fichier.filename} ne semble pas être un fichier FASTA valide.")

        records = list(SeqIO.parse(StringIO(texte), "fasta"))

        if not records:
            raise ValueError(f"Aucune séquence FASTA détectée dans {fichier.filename}.")

        for record in records:
            sequence = str(record.seq).upper().replace(" ", "").replace("\n", "")

            sequences.append({
                "id": record.id,
                "name": record.name,
                "description": record.description,
                "filename": fichier.filename,
                "sequence": sequence,
                "length": len(sequence),
                "type": detecter_type_sequence(sequence),
                "gc_content": calculer_gc_content(sequence),
            })

    if len(sequences) < 2:
        raise ValueError("Il faut au moins deux séquences pour générer un alignement.")

    return sequences


def detecter_type_sequence(sequence: str) -> str:
    alphabet = set(sequence)

    if "U" in alphabet and "T" not in alphabet:
        return "RNA"

    if alphabet.issubset({"A", "T", "C", "G", "N", "-"}):
        return "DNA"

    if alphabet.issubset({"A", "U", "C", "G", "N", "-"}):
        return "RNA"

    return "UNKNOWN"


def calculer_gc_content(sequence: str) -> float:
    sequence_sans_gap = sequence.replace("-", "").replace("N", "")

    if not sequence_sans_gap:
        return 0.0

    gc = sequence_sans_gap.count("G") + sequence_sans_gap.count("C")
    return round((gc / len(sequence_sans_gap)) * 100, 2)