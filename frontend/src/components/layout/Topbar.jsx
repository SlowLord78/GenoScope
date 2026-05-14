export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">
            Espace GenoScope
          </h2>

          <p className="text-sm text-slate-400">
            Visualisation génomique avancée
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          Outil d'Analyse de séquence
        </div>
      </div>
    </header>
  );
}