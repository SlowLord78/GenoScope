import useGenomeStore from "../store/useGenomeStore";

export default function PhylogenyPage() {
  const phylogeny = useGenomeStore((state) => state.phylogeny);

  if (!phylogeny?.edges?.length) {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-black">Arbre Phylogénique</h1>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
          Aucun arbre phylogénétique disponible.
        </div>
      </div>
    );
  }

  const reference = phylogeny.edges[0].source;
  const leaves = phylogeny.edges.map((edge) => edge.target);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Arbre Phylogénique</h1>
        <p className="mt-2 text-slate-400">
          Visualisation des distances évolutives par rapport à la séquence de référence.
        </p>
      </div>

      <div className="overflow-auto rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h2 className="mb-8 text-2xl font-bold text-emerald-300">
          {phylogeny.method}
        </h2>

        <div className="relative min-h-[500px] min-w-[900px]">
          <div className="absolute left-10 top-1/2 -translate-y-1/2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 font-bold text-emerald-300">
            {reference}
          </div>

          <div className="absolute left-72 top-1/2 h-[2px] w-32 -translate-y-1/2 bg-slate-600" />

          <div className="absolute left-[25rem] top-[80px] bottom-[80px] w-[2px] bg-slate-600" />

          {leaves.map((leaf, index) => {
            const top = 80 + index * 80;
            const edge = phylogeny.edges[index];

            return (
              <div key={leaf}>
                <div
                  className="absolute left-[25rem] h-[2px] w-40 bg-slate-600"
                  style={{ top: `${top + 18}px` }}
                />

                <div
                  className="absolute left-[35rem] rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 font-bold text-cyan-300"
                  style={{ top }}
                >
                  {leaf}
                  <span className="ml-4 text-sm font-normal text-slate-400">
                    distance {edge.distance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}