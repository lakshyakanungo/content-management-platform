import Articles from "components/Dashboard/Articles";
import Settings from "components/Dashboard/Settings";

import EUI from "./EUI";

export const DASHBOARD_PATH = "/";
export const ARTICLES_PATH = "/articles";
export const CHANGE_PASSWORD_PATH = "/settings?tab=password";
export const PROFILE_PATH = "/settings?tab=profile";
export const SETTINGS_PATH = "/settings";
export const EUI_PATH = "/kb";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLES_PATH,
    component: Articles,
  },
  {
    path: SETTINGS_PATH,
    component: Settings,
  },
];

export const EUI_ROUTES = [
  {
    path: EUI_PATH,
    component: EUI,
  },
];
