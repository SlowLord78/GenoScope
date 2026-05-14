from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.fasta_service import analyser_fichiers_fasta
from app.services.alignment_service import aligner_sequences
from app.services.statistics_service import calculer_statistiques_globales
from app.services.phylogeny_service import generer_arbre_phylogenetique

router = APIRouter()


@router.post("/upload")
async def upload_fasta(files: list[UploadFile] = File(...)):
    try:
        sequences = await analyser_fichiers_fasta(files)

        return {
            "success": True,
            "message": "Fichiers FASTA analysés avec succès.",
            "sequences": sequences,
        }

    except Exception as erreur:
        raise HTTPException(status_code=400, detail=str(erreur))


@router.post("/align")
async def align_fasta(files: list[UploadFile] = File(...)):
    try:
        sequences = await analyser_fichiers_fasta(files)
        alignement = aligner_sequences(sequences)
        statistiques = calculer_statistiques_globales(alignement)
        arbre = generer_arbre_phylogenetique(alignement)

        return {
            "success": True,
            "message": "Alignement généré avec succès.",
            "sequences": sequences,
            "alignment": alignement,
            "statistics": statistiques,
            "phylogeny": arbre,
        }

    except Exception as erreur:
        raise HTTPException(status_code=400, detail=str(erreur))


@router.get("/health")
def health():
    return {
        "status": "ok",
        "service": "GenoScope API",
    }