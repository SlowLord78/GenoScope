import base64
import tempfile
from pathlib import Path

from Bio import SeqIO
from Bio.SeqFeature import CompoundLocation
from pygenomeviz import GenomeViz


FEATURE_TYPES_AFFICHES = {"CDS", "gene", "mat_peptide", "misc_feature"}


async def generer_visualisation_genbank(files, mode="compact", feature_type="ALL", category="ALL"):
    if not files:
        raise ValueError("Aucun fichier GenBank fourni.")

    if len(files) > 10:
        raise ValueError("Veuillez importer au maximum 10 fichiers GenBank.")

    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)

        fichiers_genbank = []
        genomes_metadata = []
        annotations = []

        for fichier in files:
            extension = Path(fichier.filename).suffix.lower()

            if extension not in [".gb", ".gbk", ".genbank"]:
                raise ValueError(f"{fichier.filename} n'est pas un fichier GenBank valide.")

            contenu = await fichier.read()
            chemin_fichier = temp_path / fichier.filename
            chemin_fichier.write_bytes(contenu)

            records = list(SeqIO.parse(str(chemin_fichier), "genbank"))

            if not records:
                raise ValueError(f"Aucun enregistrement GenBank détecté dans {fichier.filename}.")

            record = records[0]
            fichiers_genbank.append(chemin_fichier)

            all_annotations = extraire_annotations(record, fichier.filename)
            annotations.extend(all_annotations)

            genomes_metadata.append({
                "filename": fichier.filename,
                "id": record.id,
                "name": record.name,
                "description": record.description,
                "length": len(record.seq),
                "feature_count": len(all_annotations),
                "cds_count": len([a for a in all_annotations if a["type"] == "CDS"]),
                "gene_count": len([a for a in all_annotations if a["type"] == "gene"]),
                "mat_peptide_count": len([a for a in all_annotations if a["type"] == "mat_peptide"]),
                "molecule_type": record.annotations.get("molecule_type", "inconnu"),
                "organism": record.annotations.get("organism", "non renseigné"),
            })

        annotations_filtrees = filtrer_annotations(annotations, feature_type, category)

        chemin_svg = temp_path / "genoscope_genbank_visualization.svg"

        creer_figure_pygenomeviz(
            fichiers_genbank=fichiers_genbank,
            chemin_sortie=chemin_svg,
            mode=mode,
            feature_type=feature_type,
            category=category,
        )

        svg_content = chemin_svg.read_text(encoding="utf-8")
        svg_base64 = base64.b64encode(svg_content.encode("utf-8")).decode("utf-8")

        return {
            "genomes": genomes_metadata,
            "annotations": annotations,
            "annotations_filtered": annotations_filtrees,
            "svg": svg_content,
            "svg_base64": svg_base64,
            "format": "svg",
            "tool": "pyGenomeViz",
            "mode": mode,
            "feature_type": feature_type,
            "category": category,
        }


def creer_figure_pygenomeviz(fichiers_genbank, chemin_sortie, mode, feature_type, category):
    gv = GenomeViz(
        fig_width=12,
        fig_track_height=0.45,
        feature_track_ratio=0.25,
        tick_track_ratio=0.15,
        align_type="center",
        tick_style="bar",
    )

    for chemin_fichier in fichiers_genbank:
        record = lire_premier_record_genbank(chemin_fichier)
        nom_piste = nettoyer_nom_piste(record.id or chemin_fichier.stem)

        track = gv.add_feature_track(
            nom_piste,
            size=len(record.seq),
            labelsize=7,
        )

        ajouter_features_sur_track(track, record, mode, feature_type, category)

    gv.savefig(str(chemin_sortie))


def ajouter_features_sur_track(track, record, mode, feature_type, category):
    annotations_record = extraire_annotations(record, filename="")

    for feature in record.features:
        if feature.type not in FEATURE_TYPES_AFFICHES:
            continue

        label = extraire_label_feature(feature)
        product = extraire_qualifier(feature, "product")
        categorie_feature = categoriser_feature(label, product)

        if feature_type != "ALL" and feature.type != feature_type:
            continue

        if category != "ALL" and categorie_feature != category:
            continue

        couleur = choisir_couleur_categorie(categorie_feature)

        for compteur, (start, end, strand) in enumerate(extraire_emplacements_feature(feature)):
            if start >= end:
                continue

            longueur = end - start

            afficher_label = doit_afficher_label(
                mode=mode,
                longueur=longueur,
                nombre_annotations=len(annotations_record),
            )

            track.add_feature(
                start=start,
                end=end,
                strand=strand,
                plotstyle="arrow" if feature.type in {"CDS", "mat_peptide"} else "box",
                label=label if compteur == 0 and afficher_label else "",
                labelsize=5,
                facecolor=couleur,
                linewidth=0.5,
            )


def doit_afficher_label(mode, longueur, nombre_annotations):
    if mode == "sans_labels":
        return False

    if mode == "detaille":
        return longueur >= 300

    if nombre_annotations > 150:
        return longueur >= 2500

    if nombre_annotations > 80:
        return longueur >= 1200

    return longueur >= 500


def extraire_annotations(record, filename):
    annotations = []

    for feature in record.features:
        if feature.type not in FEATURE_TYPES_AFFICHES:
            continue

        label = extraire_label_feature(feature)
        product = extraire_qualifier(feature, "product")
        gene = extraire_qualifier(feature, "gene")
        note = extraire_qualifier(feature, "note")
        category = categoriser_feature(label, product)

        for start, end, strand in extraire_emplacements_feature(feature):
            annotations.append({
                "genome_id": record.id,
                "filename": filename,
                "type": feature.type,
                "label": label,
                "gene": gene,
                "product": product,
                "note": note,
                "start": start + 1,
                "end": end,
                "strand": "+" if strand == 1 else "-",
                "length": end - start,
                "category": category,
            })

    return annotations


def filtrer_annotations(annotations, feature_type, category):
    resultat = annotations

    if feature_type != "ALL":
        resultat = [a for a in resultat if a["type"] == feature_type]

    if category != "ALL":
        resultat = [a for a in resultat if a["category"] == category]

    return resultat


def extraire_emplacements_feature(feature):
    location = feature.location
    parties = location.parts if isinstance(location, CompoundLocation) else [location]

    emplacements = []

    for partie in parties:
        start = int(partie.start)
        end = int(partie.end)
        strand = partie.strand if partie.strand is not None else 1
        emplacements.append((start, end, strand))

    return emplacements


def extraire_label_feature(feature):
    for cle in ["gene", "product", "locus_tag", "protein_id", "note"]:
        valeur = feature.qualifiers.get(cle)
        if valeur:
            return str(valeur[0])[:45]

    return feature.type


def extraire_qualifier(feature, cle):
    valeur = feature.qualifiers.get(cle)
    return str(valeur[0]) if valeur else ""


def categoriser_feature(label, product):
    texte = f"{label} {product}".lower()

    if any(mot in texte for mot in [
        "capsid", "envelope", "membrane", "spike", "surface", "glycoprotein",
        "protein c", "protein e", "protein m", "structural"
    ]):
        return "Protéine structurale"

    if any(mot in texte for mot in [
        "polymerase", "replicase", "helicase", "protease", "methyltransferase",
        "ns3", "ns5", "orf1ab", "rna-dependent"
    ]):
        return "Réplication / enzyme"

    if "polyprotein" in texte:
        return "Polyprotéine virale"

    if "mat_peptide" in texte or "peptide" in texte:
        return "Peptide mature"

    return "Autre annotation"


def choisir_couleur_categorie(categorie):
    couleurs = {
        "Protéine structurale": "#38bdf8",
        "Réplication / enzyme": "#34d399",
        "Polyprotéine virale": "#f97316",
        "Peptide mature": "#a78bfa",
        "Autre annotation": "#94a3b8",
    }

    return couleurs.get(categorie, "#94a3b8")


def lire_premier_record_genbank(chemin_fichier):
    records = list(SeqIO.parse(str(chemin_fichier), "genbank"))

    if not records:
        raise ValueError(f"Impossible de lire le fichier GenBank : {chemin_fichier.name}")

    return records[0]


def nettoyer_nom_piste(nom):
    nom = str(nom).replace(" ", "_")
    return nom[:40] + "..." if len(nom) > 40 else nom