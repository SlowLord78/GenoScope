import useGenomeStore from "../../store/useGenomeStore";

export default function StatsCards() {
  const statistics = useGenomeStore(
    (state) => state.statistics
  );

  if (!statistics) return null;

  const stats = [
    {
      label: "Séquences",
      value: statistics.sequence_count,
    },
    {
      label: "Mutations",
      value: statistics.mutation_count,
    },
    {
      label: "Identité",
      value: `${statistics.average_identity}%`,
    },
    {
      label: "Longueur alignée",
      value: statistics.alignment_length,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <p className="text-sm text-slate-400">
            {stat.label}
          </p>

          <h2 className="mt-4 text-4xl font-black text-emerald-300">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}