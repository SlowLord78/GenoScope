import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-center"
      >
        <h1 className="mb-6 text-7xl font-black tracking-tight">
          GenoScope
        </h1>

        <p className="mb-8 text-2xl text-slate-300">
          Alignement FASTA avancé & visualisation génomique
        </p>

        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          <p className="text-lg leading-relaxed text-slate-300">
            Analysez, alignez et visualisez des séquences génétiques
            grâce à une plateforme moderne de bioinformatique
            interactive utilisant Plotly et Biopython.
          </p>
        </div>
      </motion.div>
    </div>
  );
}