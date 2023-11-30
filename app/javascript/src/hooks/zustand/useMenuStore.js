import { create } from "zustand";

export const useMenuStore = create(set => ({
  showMenu: true,
  activeMenuState: "all",
  setShowMenu: value => set({ showMenu: value }),
  setActiveMenuState: value => set({ activeMenuState: value }),
}));
