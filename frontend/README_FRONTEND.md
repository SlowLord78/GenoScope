# GenoScope Frontend

## Description

Frontend React de la plateforme GenoScope.

L’interface permet :

- l’import de séquences FASTA,
- la visualisation des alignements,
- l’analyse des similarités,
- la consultation d’un arbre phylogénétique.

---

# Technologies

- React
- Vite
- TailwindCSS
- Zustand
- Plotly.js

---

# Installation

Installer les dépendances :

```bash
npm install
```

---

# Lancement

```bash
npm run dev
```

Application :

```txt
http://localhost:5173
```

---

# Fonctionnalités

## Séquences

- Import FASTA
- Tableau des séquences
- Informations biologiques

## Alignement

- Alignement vertical interactif
- Mise en évidence des mutations
- Sélection du nombre de positions affichées

## Analyses

- Heatmap de similarité
- Statistiques génomiques
- Visualisation interactive Plotly

## Phylogénie

- Arbre phylogénétique simplifié
- Distances évolutives

---

# Structure

```txt
frontend/
└── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── store/
    └── hooks/
```

---

# Architecture

Le frontend communique avec le backend FastAPI via Axios.

Les données sont stockées dans un store Zustand global afin d’être accessibles entre les pages :

- Séquences
- Alignement
- Analyses
- Phylogénie
