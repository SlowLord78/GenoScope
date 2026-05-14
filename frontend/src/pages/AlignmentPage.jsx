import AlignmentViewer from "../components/alignment/AlignmentViewer";

export default function AlignmentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Visualiseur d’alignement</h1>
        <p className="mt-2 text-slate-400">
          Visualisation interactive de l’alignement généré.
        </p>
      </div>

      <AlignmentViewer />
    </div>
  );
}