import useGenomeStore from "../../store/useGenomeStore";

export default function SequenceTable() {
  const sequences = useGenomeStore(
    (state) => state.sequences
  );

  if (!sequences.length) return null;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="border-b border-white/10 px-6 py-4">
        <h2 className="text-xl font-bold">
          Séquences importées
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-slate-400">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Longueur</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">GC%</th>
            </tr>
          </thead>

          <tbody>
            {sequences.map((sequence) => (
              <tr
                key={sequence.id}
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="px-6 py-4 font-medium text-emerald-300">
                  {sequence.id}
                </td>

                <td className="px-6 py-4">
                  {sequence.length}
                </td>

                <td className="px-6 py-4">
                  {sequence.type}
                </td>

                <td className="px-6 py-4">
                  {sequence.gc_content}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}