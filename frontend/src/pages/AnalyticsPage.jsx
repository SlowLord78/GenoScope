import StatsCards from "../components/analytics/StatsCards";
import SimilarityHeatmap from "../components/analytics/SimilarityHeatmap";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">Tableau d'Analyse</h1>
        <p className="mt-2 text-slate-400">
          Statistiques, mutations et matrice de similarité.
        </p>
      </div>

      <StatsCards />
      <SimilarityHeatmap />
    </div>
  );
}