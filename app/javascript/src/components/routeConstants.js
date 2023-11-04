import Articles from "components/Dashboard/Articles";
import Settings from "components/Dashboard/Settings";

import { Create, Edit } from "./Dashboard/Articles/Actions";
import EUI from "./EUI";

export const DASHBOARD_PATH = "/";
export const ARTICLES_PATH = "/articles";
export const NEW_ARTICLE_PATH = "/articles/new";
export const EDIT_ARTICLE_PATH = "/articles/edit/:id";
export const CHANGE_PASSWORD_PATH = "/settings?tab=password";
export const PROFILE_PATH = "/settings?tab=profile";
export const SETTINGS_PATH = "/settings";
export const EUI_PATH = "/eui";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLES_PATH,
    component: Articles,
  },
  {
    path: SETTINGS_PATH,
    component: Settings,
  },
  {
    path: NEW_ARTICLE_PATH,
    component: Create,
  },
  {
    path: EDIT_ARTICLE_PATH,
    component: Edit,
  },
];

export const EUI_ROUTES = [
  {
    path: EUI_PATH,
    component: EUI,
  },
];
