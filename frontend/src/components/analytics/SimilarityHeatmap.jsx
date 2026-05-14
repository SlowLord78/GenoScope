import { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min";

import useGenomeStore from "../../store/useGenomeStore";

export default function SimilarityHeatmap() {
  const chartRef = useRef(null);
  const statistics = useGenomeStore((state) => state.statistics);

  useEffect(() => {
    const element = chartRef.current;

    if (!statistics?.similarity_matrix || !element) return;

    const matrix = statistics.similarity_matrix;

    Plotly.react(
      element,
      [
        {
          z: matrix.values,
          x: matrix.labels,
          y: matrix.labels,
          type: "heatmap",
          colorscale: "Viridis",
          hoverongaps: false,
        },
      ],
      {
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        font: { color: "white" },
        height: 600,
        margin: { t: 30, r: 30, b: 120, l: 120 },
      },
      {
        responsive: true,
        displaylogo: false,
      }
    );

    return () => {
      if (element) {
        try {
          Plotly.purge(element);
        } catch {
          // Nettoyage ignoré si React a déjà démonté le DOM.
        }
      }
    };
  }, [statistics]);

  if (!statistics?.similarity_matrix) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-bold">
        Matrice de similarité
      </h2>

      <div ref={chartRef} className="min-h-[600px] w-full" />
      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-6">
        <h3 className="mb-4 text-xl font-bold text-emerald-300">
          Interprétation de la matrice
        </h3>

        <div className="mb-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-[#440154]" />

            <div>
              <p className="font-semibold text-white">
                Violet foncé
              </p>

              <p className="text-sm text-slate-400">
                Similarité plus faible
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-[#31688e]" />

            <div>
              <p className="font-semibold text-white">
                Bleu
              </p>

              <p className="text-sm text-slate-400">
                Similarité intermédiaire
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-[#35b779]" />

            <div>
              <p className="font-semibold text-white">
                Vert
              </p>

              <p className="text-sm text-slate-400">
                Séquences très proches
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-[#fde725]" />

            <div>
              <p className="font-semibold text-white">
                Jaune
              </p>

              <p className="text-sm text-slate-400">
                Similarité maximale
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm leading-7 text-slate-300">
          <p>
            Chaque cellule représente le pourcentage de similarité entre deux séquences génétiques.
          </p>

          <p>
            Plus la couleur se rapproche du jaune, plus les séquences sont génétiquement proches.
          </p>

          <p>
            Les couleurs violettes indiquent davantage de mutations ou de différences nucléotidiques entre les séquences.
          </p>

          <p>
            La diagonale principale correspond toujours à une similarité de 100%, car une séquence est identique à elle-même.
          </p>
        </div>
      </div>
    </div>
  );
}