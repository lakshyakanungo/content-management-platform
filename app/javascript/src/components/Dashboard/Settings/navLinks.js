import i18n from "common/i18n";

import Categories from "./Categories";
import General from "./General";
import Redirection from "./Redirection";
import Security from "./Security";

export const SETTINGS_NAVLINKS = [
  {
    key: "general",
    label: i18n.t("dashboard.settings.navlink.general.label"),
    description: i18n.t("dashboard.settings.navlink.general.description"),
    path: "/settings?tab=general",
    component: General,
  },
  {
    key: "redirection",
    label: i18n.t("dashboard.settings.navlink.redirection.label"),
    description: i18n.t("dashboard.settings.navlink.redirection.description"),
    path: "/settings?tab=redirection",
    component: Redirection,
  },
  {
    key: "password",
    label: i18n.t("dashboard.settings.navlink.security.label"),
    description: i18n.t("dashboard.settings.navlink.security.description"),
    path: "/settings?tab=password",
    component: Security,
  },
  {
    key: "categories",
    label: i18n.t("dashboard.settings.navlink.categories.label"),
    description: i18n.t("dashboard.settings.navlink.categories.description"),
    path: "/settings?tab=categories",
    component: Categories,
  },
];
