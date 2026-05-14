import UploadZone from "../components/upload/UploadZone";
import SequenceTable from "../components/upload/SequenceTable";

export default function WorkspacePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">
          Séquences
        </h1>

        <p className="mt-2 text-slate-400">
          Importez et gérez vos fichiers FASTA
        </p>
      </div>

      <UploadZone />

      <SequenceTable />
    </div>
  );
}