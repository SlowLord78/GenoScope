# GenoScope Backend

## Description

Le backend de GenoScope est une API FastAPI chargée des traitements bioinformatiques de l'application.

Il gère deux modules principaux :

1. le traitement des fichiers FASTA ;
2. la visualisation des fichiers GenBank avec pyGenomeViz.

---

## Technologies utilisées

- Python
- FastAPI
- Uvicorn
- Biopython
- pyGenomeViz
- Matplotlib
- NumPy
- Pandas
- python-multipart

---

## Installation

Depuis le dossier `backend` :

```bash
python -m venv venv
```

Activer l'environnement virtuel.

Sous Windows :

```bash
venv\Scripts\activate
```

Sous Linux / Mac :

```bash
source venv/bin/activate
```

Installer les dépendances :

```bash
pip install -r requirements.txt
```

---

## Lancement

Depuis le dossier `backend` :

```bash
uvicorn app.main:app --reload
```

API disponible sur :

```txt
http://127.0.0.1:8000
```

Documentation Swagger :

```txt
http://127.0.0.1:8000/docs
```

---

## Routes principales

### Santé de l'API

```txt
GET /api/health
```

Permet de vérifier que l'API fonctionne.

---

### Upload FASTA

```txt
POST /api/upload
```

Analyse les fichiers FASTA importés et retourne les informations principales sur les séquences.

---

### Alignement FASTA

```txt
POST /api/align
```

Génère :

- un alignement rapide basé sur une référence ;
- des statistiques ;
- une matrice de similarité ;
- des données pour l'arbre phylogénétique simplifié.

---

### Visualisation GenBank

```txt
POST /api/genbank/visualize
```

Paramètres possibles :

```txt
mode=compact
mode=sans_labels
mode=detaille
```

```txt
feature_type=ALL
feature_type=CDS
feature_type=gene
feature_type=mat_peptide
feature_type=misc_feature
```

```txt
category=ALL
category=Protéine structurale
category=Réplication / enzyme
category=Polyprotéine virale
category=Peptide mature
category=Autre annotation
```

Cette route utilise pyGenomeViz pour générer une carte génomique au format SVG à partir de fichiers GenBank.

---

## Structure

```txt
backend/
└── app/
    ├── main.py
    ├── api/
    │   └── routes.py
    ├── services/
    │   ├── fasta_service.py
    │   ├── alignment_service.py
    │   ├── statistics_service.py
    │   ├── phylogeny_service.py
    │   └── genbank_visualization_service.py
    └── utils/
        └── file_utils.py
```

---

## Services

### `fasta_service.py`

Lecture, validation et extraction des fichiers FASTA.

### `alignment_service.py`

Alignement rapide des séquences FASTA à partir d'une séquence de référence.

### `statistics_service.py`

Calcul des statistiques, mutations et matrice de similarité.

### `phylogeny_service.py`

Création de données simplifiées pour représenter les distances entre séquences.

### `genbank_visualization_service.py`

Lecture de fichiers GenBank, extraction d'annotations biologiques et génération d'une visualisation pyGenomeViz.

---

## Notes

Les fichiers GenBank doivent contenir des annotations biologiques pour produire une visualisation riche.

Certains génomes viraux peuvent ne contenir qu'une grande annotation de type `polyprotein`. Dans ce cas, la visualisation sera logiquement plus simple.

---

## Mise à jour des dépendances

Après ajout ou modification de dépendances Python :

```bash
pip freeze > requirements.txt
```
