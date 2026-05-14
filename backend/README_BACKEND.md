# GenoScope Backend

## Description

Backend FastAPI permettant :

- l’analyse de fichiers FASTA,
- l’alignement de séquences,
- le calcul de statistiques,
- la génération de données phylogénétiques.

---

# Technologies

- FastAPI
- Biopython
- NumPy
- Pandas

---

# Installation

Créer un environnement virtuel :

```bash
python -m venv venv
```

Activer l’environnement :

## Windows

```bash
venv\Scripts\activate
```

## Linux / Mac

```bash
source venv/bin/activate
```

Installer les dépendances :

```bash
pip install -r requirements.txt
```

---

# Lancement

```bash
uvicorn app.main:app --reload
```

Documentation Swagger :

```txt
http://127.0.0.1:8000/docs
```

---

# Routes API

## Vérification serveur

```txt
GET /api/health
```

## Upload FASTA

```txt
POST /api/upload
```

## Alignement

```txt
POST /api/align
```

---

# Structure

```txt
backend/
└── app/
    ├── main.py
    ├── api/
    ├── services/
    └── utils/
```

---

# Fonctionnement

Le backend :

1. Lit les fichiers FASTA
2. Extrait les séquences
3. Génère un alignement
4. Calcule les statistiques
5. Génère les données phylogénétiques
6. Retourne les résultats au frontend
