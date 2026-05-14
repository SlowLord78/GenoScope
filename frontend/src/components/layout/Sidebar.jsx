import { NavLink } from "react-router-dom";

import {
  Dna,
  Upload,
  BarChart3,
  GitBranch,
} from "lucide-react";

const links = [
  {
    to: "/",
    label: "Accueil",
    icon: Dna,
  },
  {
    to: "/workspace",
    label: "Séquences",
    icon: Upload,
  },
  {
    to: "/alignment",
    label: "Alignement",
    icon: Dna,
  },
  {
    to: "/analytics",
    label: "Analyses",
    icon: BarChart3,
  },
  {
    to: "/phylogeny",
    label: "Phylogénie",
    icon: GitBranch,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-3 border-b border-white/10 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20">
          <Dna className="text-emerald-400" />
        </div>

        <div>
          <h1 className="text-xl font-bold">GenoScope</h1>

          <p className="text-sm text-slate-400">
            Plateforme d’alignement génomique
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-2xl px-4 py-3 transition-all
                ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "text-slate-300 hover:bg-white/5"
                }
                `
              }
            >
              <Icon size={20} />

              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}