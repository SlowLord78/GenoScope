import { useMemo, useRef, useState } from "react";
import {
  FileCode2,
  Loader2,
  UploadCloud,
  Maximize2,
  X,
} from "lucide-react";

import useGenbankUpload from "../hooks/useGenbankUpload";
import useGenbankStore from "../store/useGenbankStore";

const categories = [
  { label: "Protéine structurale", color: "bg-sky-400" },
  { label: "Réplication / enzyme", color: "bg-emerald-400" },
  { label: "Polyprotéine virale", color: "bg-orange-500" },
  { label: "Peptide mature", color: "bg-violet-400" },
  { label: "Autre annotation", color: "bg-slate-400" },
];

export default function GenbankViewerPage() {
  const inputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mode, setMode] = useState("compact");
  const [featureType, setFeatureType] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [tableFilter, setTableFilter] = useState("ALL");
  const [fullscreen, setFullscreen] = useState(false);

  const { uploadGenbankFiles } = useGenbankUpload();

  const genomes = useGenbankStore((state) => state.genomes);
  const annotations = useGenbankStore((state) => state.annotations || []);
  const svg = useGenbankStore((state) => state.svg);
  const loading = useGenbankStore((state) => state.loading);
  const error = useGenbankStore((state) => state.error);

  const annotationsFiltreesTable = useMemo(() => {
    if (tableFilter === "ALL") return annotations;
    return annotations.filter((annotation) => annotation.type === tableFilter);
  }, [annotations, tableFilter]);

  const typesDisponibles = useMemo(() => {
    return [...new Set(annotations.map((annotation) => annotation.type))];
  }, [annotations]);

  const handleFiles = async (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    setSelectedFiles(files);

    await uploadGenbankFiles(files, {
      mode,
      feature_type: featureType,
      category,
    });

    event.target.value = "";
  };

  const regenererFigure = async () => {
    if (!selectedFiles.length) return;

    await uploadGenbankFiles(selectedFiles, {
      mode,
      feature_type: featureType,
      category,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
          <FileCode2 size={16} />
          Visualisation comparative de génomes annotés
        </div>

        <h1 className="text-4xl font-black">Visualisation GenBank</h1>

        <p className="mt-2 max-w-4xl text-slate-400">
          Importez plusieurs génomes complets au format GenBank pour visualiser leur organisation génomique, leurs régions codantes et leurs annotations biologiques.
        </p>
      </div>

      <div className="rounded-3xl border border-dashed border-cyan-500/30 bg-white/5 p-10 backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/10">
            {loading ? (
              <Loader2 size={42} className="animate-spin text-cyan-300" />
            ) : (
              <UploadCloud size={42} className="text-cyan-300" />
            )}
          </div>

          <h2 className="mb-3 text-3xl font-bold">Importer des fichiers GenBank</h2>

          <p className="mb-8 max-w-2xl text-slate-400">
            Formats acceptés : .gb, .gbk, .genbank. Pour une visualisation lisible, importez idéalement 5 à 10 génomes complets.
          </p>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".gb,.gbk,.genbank"
            className="hidden"
            onChange={handleFiles}
          />

          <button
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="rounded-2xl bg-cyan-400 px-8 py-4 font-semibold text-black transition-all hover:scale-105 hover:bg-cyan-300 disabled:opacity-50"
          >
            {loading ? "Génération en cours..." : "Sélectionner des fichiers GenBank"}
          </button>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-xl font-bold text-cyan-300">
            Options de lisibilité
          </h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <SelectField label="Mode d’affichage" value={mode} onChange={setMode}>
              <option value="compact">Vue compacte</option>
              <option value="sans_labels">Sans labels</option>
              <option value="detaille">Vue détaillée</option>
            </SelectField>

            <SelectField label="Type affiché" value={featureType} onChange={setFeatureType}>
              <option value="ALL">Tous</option>
              <option value="CDS">CDS</option>
              <option value="gene">Gènes</option>
              <option value="mat_peptide">Peptides matures</option>
              <option value="misc_feature">Autres features</option>
            </SelectField>

            <SelectField label="Catégorie biologique" value={category} onChange={setCategory}>
              <option value="ALL">Toutes</option>
              {categories.map((cat) => (
                <option key={cat.label} value={cat.label}>{cat.label}</option>
              ))}
            </SelectField>

            <div className="flex items-end">
              <button
                onClick={regenererFigure}
                disabled={loading}
                className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black hover:bg-cyan-300 disabled:opacity-50"
              >
                Appliquer
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Pour les génomes très annotés, privilégiez “Sans labels” ou filtrez par type/catégorie. Les détails restent disponibles dans le tableau d’annotations.
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
          {error}
        </div>
      )}

      {genomes.length > 0 && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <InfoCard label="Génomes" value={genomes.length} />
          <InfoCard label="Annotations" value={annotations.length} />
          <InfoCard label="CDS" value={genomes.reduce((s, g) => s + g.cds_count, 0)} />
          <InfoCard label="Peptides matures" value={genomes.reduce((s, g) => s + g.mat_peptide_count, 0)} />
        </div>
      )}

      {svg && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-300">
                Carte génomique pyGenomeViz
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Chaque piste représente un génome. Les flèches représentent des régions annotées dans les fichiers GenBank.
              </p>
            </div>

            <button
              onClick={() => setFullscreen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
            >
              <Maximize2 size={16} />
              Plein écran
            </button>
          </div>

          <div className="max-h-[650px] overflow-auto rounded-2xl border border-white/10 bg-white p-4">
            <div
              className="[&>svg]:h-auto [&>svg]:max-w-full [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>

          <GenbankLegend />

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-300">
            <h3 className="mb-3 text-lg font-bold text-cyan-300">
              Comment lire cette visualisation ?
            </h3>

            <p>
              Les lignes horizontales sont des génomes. Les flèches indiquent les régions biologiquement annotées. Leur position correspond à leur emplacement dans le génome, et leur orientation indique le sens de lecture.
            </p>

            <p className="mt-3">
              Quand un génome contient énormément d’annotations, les labels peuvent devenir illisibles. C’est pourquoi GenoScope propose un mode compact, un mode sans labels, des filtres par type et une table détaillée.
            </p>
          </div>
        </div>
      )}

      {annotations.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-300">
                Annotations biologiques
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Les détails sont volontairement déplacés ici pour éviter de surcharger la carte génomique.
              </p>
            </div>

            <select
              value={tableFilter}
              onChange={(event) => setTableFilter(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#080b16] px-4 py-2 text-sm text-white outline-none"
            >
              <option value="ALL">Tous les types</option>
              {typesDisponibles.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="max-h-[500px] overflow-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-[#080b16] text-left text-slate-400">
                <tr>
                  <th className="px-4 py-3">Génome</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Catégorie</th>
                  <th className="px-4 py-3">Label</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Brin</th>
                  <th className="px-4 py-3">Produit</th>
                </tr>
              </thead>

              <tbody>
                {annotationsFiltreesTable.map((annotation, index) => (
                  <tr key={index} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 text-cyan-300">{annotation.genome_id}</td>
                    <td className="px-4 py-3 text-slate-300">{annotation.type}</td>
                    <td className="px-4 py-3 text-slate-300">{annotation.category}</td>
                    <td className="px-4 py-3 text-emerald-300">{annotation.label}</td>
                    <td className="px-4 py-3 text-slate-300">{annotation.start} → {annotation.end}</td>
                    <td className="px-4 py-3 text-slate-300">{annotation.strand}</td>
                    <td className="px-4 py-3 text-slate-300">{annotation.product || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {fullscreen && (
        <div className="fixed inset-0 z-[999] bg-black/95 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-cyan-300">
              Carte génomique — plein écran
            </h2>

            <button
              onClick={() => setFullscreen(false)}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-white hover:bg-white/20"
            >
              <X size={18} />
              Fermer
            </button>
          </div>

          <div className="h-[calc(100vh-100px)] overflow-auto rounded-2xl bg-white p-6">
            <div
              className="
                [&>svg]:h-auto
                [&>svg]:min-w-[3200px]
                [&>svg]:w-[3200px]
              "
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-400">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#080b16] px-4 py-3 text-sm text-white outline-none"
      >
        {children}
      </select>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-sm text-slate-400">{label}</p>
      <h2 className="mt-4 text-4xl font-black text-cyan-300">{value}</h2>
    </div>
  );
}

function GenbankLegend() {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
      <h3 className="mb-4 text-lg font-bold text-cyan-300">
        Légende biologique
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => (
          <div key={category.label} className="flex items-center gap-3">
            <div className={`h-5 w-5 rounded ${category.color}`} />
            <span className="text-sm text-slate-300">{category.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}