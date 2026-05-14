import { create } from "zustand";

const useGenomeStore = create((set) => ({
  sequences: [],
  alignment: null,
  statistics: null,
  phylogeny: null,
  loading: false,
  error: null,

  setLoading: (value) => set({ loading: value }),

  setError: (value) => set({ error: value }),

  setData: (data) =>
    set({
      sequences: data.sequences || [],
      alignment: data.alignment || null,
      statistics: data.statistics || null,
      phylogeny: data.phylogeny || null,
    }),
}));

export default useGenomeStore;