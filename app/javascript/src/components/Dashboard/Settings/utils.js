import { SETTINGS_NAVLINKS } from "./navLinks";

export const getActiveNavLink = key =>
  SETTINGS_NAVLINKS.find(navlink => key === navlink.key);
