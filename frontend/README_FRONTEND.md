# GenoScope Frontend

## Description

Le frontend de GenoScope est une interface React permettant d'utiliser les fonctionnalités bioinformatiques fournies par le backend FastAPI.

L'application permet :

- l'import de fichiers FASTA ;
- l'affichage des séquences ;
- la visualisation d'alignements ;
- l'analyse statistique ;
- l'affichage d'une matrice de similarité ;
- l'affichage d'un arbre phylogénétique simplifié ;
- l'import et la visualisation de fichiers GenBank avec pyGenomeViz.

---

## Technologies utilisées

- React
- Vite
- TailwindCSS
- Zustand
- Axios
- Plotly.js
- Lucide React
- React Router

---

## Installation

Depuis le dossier `frontend` :

```bash
npm install
```

---

## Lancement

```bash
npm run dev
```

Application disponible sur :

```txt
http://localhost:5173
```

---

## Structure

```txt
frontend/
└── src/
    ├── components/
    │   ├── alignment/
    │   ├── analytics/
    │   ├── layout/
    │   └── upload/
    ├── hooks/
    │   ├── useFastaUpload.js
    │   └── useGenbankUpload.js
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── WorkspacePage.jsx
    │   ├── AlignmentPage.jsx
    │   ├── AnalyticsPage.jsx
    │   ├── PhylogenyPage.jsx
    │   └── GenbankViewerPage.jsx
    ├── router/
    ├── services/
    └── store/
```

---

## Pages

### Accueil

Page de présentation de GenoScope.

### Séquences

Page d'import des fichiers FASTA.

### Alignement

Visualisation verticale des alignements FASTA avec choix du nombre de positions affichées.

### Analyses

Affichage des statistiques et de la matrice de similarité Plotly.

### Phylogénie

Affichage d'un arbre phylogénétique simplifié basé sur les distances à la référence.

### Visualisation GenBank

Page dédiée aux fichiers GenBank.

Fonctionnalités :

- import de fichiers `.gb`, `.gbk`, `.genbank` ;
- carte génomique pyGenomeViz ;
- plein écran ;
- modes d'affichage ;
- filtres par type ;
- filtres par catégorie biologique ;
- tableau des annotations ;
- légende biologique.

---

## Communication avec le backend

Le frontend communique avec l'API FastAPI via Axios.

Le fichier de configuration principal est :

```txt
src/services/api.js
```

Base URL utilisée :

```txt
http://127.0.0.1:8000/api
```

---

## Stores Zustand

### `useGenomeStore.js`

Stocke les données issues du module FASTA :

- séquences ;
- alignement ;
- statistiques ;
- phylogénie.

### `useGenbankStore.js`

Stocke les données issues du module GenBank :

- génomes ;
- annotations ;
- SVG pyGenomeViz ;
- état de chargement ;
- erreurs.

---

## Build de production

Pour générer une version de production :

```bash
npm run build
```

Pour prévisualiser le build :

```bash
npm run preview
```

---

## Notes

Le dossier `node_modules` ne doit pas être envoyé dans le ZIP ou sur GitHub.

Il sera recréé avec :

```bash
npm install
```
