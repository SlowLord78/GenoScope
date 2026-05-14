import { useState } from "react";

import useGenomeStore from "../../store/useGenomeStore";

const nucleotideColors = {
  A: "bg-emerald-500/20 text-emerald-300",
  T: "bg-red-500/20 text-red-300",
  U: "bg-red-500/20 text-red-300",
  G: "bg-yellow-500/20 text-yellow-300",
  C: "bg-cyan-500/20 text-cyan-300",
  "-": "bg-slate-500/20 text-slate-300",
  N: "bg-purple-500/20 text-purple-300",
};

export default function AlignmentViewer() {
  const [limiteAffichage, setLimiteAffichage] = useState(100);

  const alignment = useGenomeStore((state) => state.alignment);

  if (!alignment) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
        Aucun alignement disponible.
      </div>
    );
  }

  const sequences = alignment.items || [];

  const maxLength = Math.max(
    ...sequences.map((item) => item.aligned_sequence.length)
  );

  const longueurAffichee =
    limiteAffichage === "ALL"
      ? maxLength
      : Math.min(maxLength, Number(limiteAffichage));

  const positions = Array.from(
    { length: longueurAffichee },
    (_, index) => index
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-emerald-300">
            Visualiseur vertical d’alignement
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Chaque ligne représente une position de l’alignement.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <label className="text-sm text-slate-400">
            Positions affichées
          </label>

          <select
            value={limiteAffichage}
            onChange={(event) => {
              const value = event.target.value;

              setLimiteAffichage(value === "ALL" ? "ALL" : Number(value));
            }}
            className="rounded-xl border border-white/10 bg-[#080b16] px-4 py-2 text-sm text-white outline-none"
          >
            <option value={100}>100</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            <option value={5000}>5000</option>
            <option value="ALL">Tout</option>
          </select>
        </div>
      </div>

      <div className="border-b border-white/10 px-6 py-3 text-sm text-slate-400">
        Affichage :{" "}
        <span className="font-semibold text-emerald-300">
          {longueurAffichee}
        </span>{" "}
        / {maxLength} positions
      </div>

      <div className="max-h-[650px] overflow-y-auto overflow-x-auto">
        <table className="min-w-full border-collapse font-mono text-sm">
          <thead className="sticky top-0 z-20 bg-[#080b16]">
            <tr className="border-b border-white/10">
              <th className="sticky left-0 z-30 bg-[#080b16] px-4 py-3 text-left text-slate-400">
                Position
              </th>

              {sequences.map((sequence) => (
                <th
                  key={sequence.id}
                  className="min-w-40 px-4 py-3 text-left text-emerald-300"
                >
                  {sequence.id}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {positions.map((position) => {
              const referenceBase =
                sequences[0]?.aligned_sequence[position] || "-";

              return (
                <tr
                  key={position}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="sticky left-0 z-10 bg-[#080b16] px-4 py-2 text-slate-400">
                    {position + 1}
                  </td>

                  {sequences.map((sequence, index) => {
                    const nucleotide =
                      sequence.aligned_sequence[position] || "-";

                    const isMutation =
                      index !== 0 && nucleotide !== referenceBase;

                    return (
                      <td key={sequence.id} className="px-4 py-2">
                        <span
                          title={
                            isMutation
                              ? `Mutation : ${referenceBase}${position + 1}${nucleotide}`
                              : `Position ${position + 1}`
                          }
                          className={`
                            inline-flex h-8 w-8 items-center justify-center rounded-lg font-bold
                            ${
                              nucleotideColors[nucleotide] ||
                              "bg-slate-500/20 text-slate-300"
                            }
                            ${isMutation ? "ring-2 ring-pink-400" : ""}
                          `}
                        >
                          {nucleotide}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}