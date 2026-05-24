import { create } from "zustand";

const useGenbankStore = create((set) => ({
  genomes: [],
  annotations: [],
  svg: null,
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  setGenbankData: (data) =>
    set({
      genomes: data.genomes || [],
      annotations: data.annotations || [],
      svg: data.svg || null,
      error: null,
    }),

  resetGenbankData: () =>
    set({
      genomes: [],
      annotations: [],
      svg: null,
      loading: false,
      error: null,
    }),
}));

export default useGenbankStore;