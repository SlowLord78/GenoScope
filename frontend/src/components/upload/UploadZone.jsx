import { useRef } from "react";

import { UploadCloud, Loader2 } from "lucide-react";

import useFastaUpload from "../../hooks/useFastaUpload";

import useGenomeStore from "../../store/useGenomeStore";

export default function UploadZone() {
  const inputRef = useRef();

  const { uploadFasta } = useFastaUpload();

  const loading = useGenomeStore((state) => state.loading);

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files);

    if (!files.length) return;

    await uploadFasta(files);
  };

  return (
    <div className="rounded-3xl border border-dashed border-emerald-500/30 bg-white/5 p-16 backdrop-blur-xl">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10">
          {loading ? (
            <Loader2
              size={42}
              className="animate-spin text-emerald-400"
            />
          ) : (
            <UploadCloud
              size={42}
              className="text-emerald-400"
            />
          )}
        </div>

        <h2 className="mb-4 text-3xl font-bold">
          Importer des fichiers FASTA
        </h2>

        <p className="mb-8 max-w-2xl text-slate-400">
          Importez plusieurs séquences FASTA pour générer un alignement et des visualisations.
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".fasta,.fa,.fna,.txt"
          className="hidden"
          onChange={handleFiles}
        />

        <button
          onClick={() => inputRef.current.click()}
          disabled={loading}
          className="
            rounded-2xl bg-emerald-500 px-8 py-4
            font-semibold text-black transition-all
            hover:scale-105 hover:bg-emerald-400
            disabled:opacity-50
          "
        >
          {loading
            ? "Alignement en cours..."
            : "Sélectionner des fichiers FASTA"}
        </button>
      </div>
    </div>
  );
}