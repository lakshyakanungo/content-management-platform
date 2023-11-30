import { create } from "zustand";

export const usePageStore = create(set => ({
  currentPageNumber: 1,
  setCurrentPageNumber: page => set({ currentPageNumber: page }),
}));
