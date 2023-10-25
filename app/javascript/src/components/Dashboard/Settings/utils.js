import classNames from "classnames";

import { SETTINGS_NAVLINKS } from "./navLinks";

export const getActiveNavLink = key =>
  SETTINGS_NAVLINKS.find(navlink => key === navlink.key);

export const buildLayoutClassName = classname =>
  classNames(classname, " flex flex-col gap-4 my-24");
