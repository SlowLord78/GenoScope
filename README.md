# GenoScope

## Présentation

GenoScope est une plateforme web interactive de bioinformatique permettant :

- l’import de séquences FASTA,
- l’alignement génomique,
- la visualisation des mutations,
- l’analyse de similarité,
- la génération d’un arbre phylogénétique simplifié.

Le projet utilise :

- FastAPI pour le backend,
- React + Vite pour le frontend,
- Plotly pour les visualisations,
- Biopython pour les traitements bioinformatiques.

---

# Fonctionnalités

## Gestion des séquences FASTA

- Import multiple de fichiers FASTA
- Détection ADN / ARN
- Calcul du taux GC
- Analyse automatique des séquences

## Alignement

- Alignement rapide basé sur une séquence de référence
- Visualisation verticale interactive
- Détection des mutations
- Affichage dynamique du nombre de positions

## Analyses

- Matrice de similarité
- Heatmap interactive Plotly
- Statistiques génomiques
- Pourcentage d’identité

## Phylogénie

- Génération d’un arbre phylogénétique simplifié
- Distances évolutives relatives

---

# Technologies utilisées

## Frontend

- React
- Vite
- TailwindCSS
- Zustand
- Plotly.js
- Lucide React

## Backend

- FastAPI
- Biopython
- NumPy
- Pandas

---

# Structure du projet

```txt
GenoScope/
├── backend/
├── frontend/
├── exemples_fasta/
└── README.md
```

---

# Installation

## Backend

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Installer les dépendances :

```bash
pip install -r requirements.txt
```

Lancer le backend :

```bash
uvicorn app.main:app --reload
```

API disponible sur :

```txt
http://127.0.0.1:8000/docs
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Application disponible sur :

```txt
http://localhost:5173
```

---

# Utilisation

1. Ouvrir la page Séquences
2. Importer plusieurs fichiers FASTA
3. Consulter :
   - l’alignement,
   - les statistiques,
   - la matrice de similarité,
   - l’arbre phylogénétique

---

# Données de test

Des exemples FASTA SARS-CoV-2 sont fournis dans :

```txt
exemples_fasta/
```

---

# Auteur

Projet réalisé dans le cadre du cours de Bio-Informatique.
