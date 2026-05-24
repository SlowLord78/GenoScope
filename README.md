# GenoScope

## Présentation

GenoScope est une application web de bio-informatique permettant de visualiser et d'analyser des données génomiques.

Le projet répond à deux objectifs principaux :

1. permettre à un utilisateur d'importer des séquences FASTA afin de générer un alignement, des statistiques et des visualisations ;
2. permettre à un utilisateur d'importer plusieurs génomes annotés au format GenBank afin de visualiser leur organisation génomique avec pyGenomeViz.

L'application est composée :

- d'un backend FastAPI chargé du traitement bioinformatique ;
- d'un frontend React/Vite chargé de l'interface utilisateur ;
- de visualisations interactives avec Plotly et pyGenomeViz ;
- d'un système d'import de fichiers FASTA et GenBank.

---

## Fonctionnalités principales

### Module FASTA

- Import de plusieurs fichiers FASTA
- Détection du type de séquence
- Calcul du taux GC
- Alignement rapide basé sur une séquence de référence
- Visualisation verticale de l'alignement
- Choix du nombre de positions affichées
- Mise en évidence des mutations
- Calcul de statistiques globales
- Matrice de similarité avec Plotly
- Arbre phylogénétique simplifié basé sur les distances

### Module GenBank

- Import de plusieurs fichiers GenBank : `.gb`, `.gbk`, `.genbank`
- Visualisation de plusieurs génomes annotés avec pyGenomeViz
- Affichage des régions annotées : CDS, gènes, peptides matures, autres annotations
- Mode compact, mode détaillé et mode sans labels
- Filtrage par type d'annotation
- Filtrage par catégorie biologique
- Affichage plein écran de la carte génomique
- Tableau détaillé des annotations biologiques
- Légende explicative des couleurs
- Résumé des génomes importés

---

## Technologies utilisées

### Backend

- Python
- FastAPI
- Biopython
- pyGenomeViz
- Matplotlib
- NumPy
- Pandas
- Uvicorn

### Frontend

- React
- Vite
- TailwindCSS
- Zustand
- Axios
- Plotly.js
- Lucide React

---

## Structure du projet

```txt
GenoScope/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   └── utils/
│   ├── requirements.txt
│   └── README_BACKEND.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   └── store/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README_FRONTEND.md
│
├── exemples_fasta/
├── README.md
└── .gitignore
```

---

## Installation et lancement

### 1. Lancer le backend

Depuis la racine du projet :

```bash
cd backend
python -m venv venv
```

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

Lancer l'API :

```bash
uvicorn app.main:app --reload
```

L'API est disponible à l'adresse :

```txt
http://127.0.0.1:8000
```

La documentation Swagger est disponible à l'adresse :

```txt
http://127.0.0.1:8000/docs
```

---

### 2. Lancer le frontend

Dans un second terminal, depuis la racine du projet :

```bash
cd frontend
npm install
npm run dev
```

L'application est disponible à l'adresse :

```txt
http://localhost:5173
```

---

## Utilisation

### Analyse FASTA

1. Aller dans la page **Séquences**
2. Importer plusieurs fichiers FASTA
3. Consulter :
   - les séquences importées ;
   - le visualiseur d'alignement ;
   - les statistiques ;
   - la matrice de similarité ;
   - l'arbre phylogénétique simplifié.

### Visualisation GenBank

1. Aller dans la page **Visualisation GenBank**
2. Importer plusieurs fichiers `.gb`, `.gbk` ou `.genbank`
3. Utiliser les options de lisibilité :
   - mode compact ;
   - mode sans labels ;
   - mode détaillé ;
   - filtre par type ;
   - filtre par catégorie.
4. Consulter :
   - la carte génomique pyGenomeViz ;
   - le mode plein écran ;
   - la légende ;
   - le tableau des annotations.

---

## Données de test

Des fichiers FASTA d'exemple sont fournis dans le dossier :

```txt
exemples_fasta/
```

Pour tester le module GenBank, il est possible de télécharger des génomes complets au format GenBank depuis NCBI GenBank.

Exemples de recherches possibles :

```txt
SARS-CoV-2 complete genome
dengue virus complete genome
human herpesvirus complete genome
```

Lors du téléchargement depuis NCBI, choisir le format **GenBank** et non FASTA.

---

## Remarques

Le module FASTA travaille sur des séquences nucléotidiques brutes.

Le module GenBank travaille sur des génomes annotés. Il ne compare pas les nucléotides un par un, mais affiche l'organisation des régions biologiques annotées dans les fichiers GenBank.

---

## Auteur

Projet réalisé dans le cadre du cours de Bio-Informatique.
