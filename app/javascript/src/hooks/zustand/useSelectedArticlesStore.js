import { create } from "zustand";

export const useSelectedArticlesStore = create(set => ({
  selectedArticleIds: [],
  setSelectedArticleIds: ids => set({ selectedArticleIds: ids }),
}));
