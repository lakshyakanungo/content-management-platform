import { create } from "zustand";

export const useSelectedCategoriesStore = create(set => ({
  selectedCategories: [],
  setSelectedCategories: categories => set({ selectedCategories: categories }),
}));
