import Categories from "./Categories";
import General from "./General";
import Redirection from "./Redirection";
import Security from "./Security";

// Note: This is not kept in constants.js to avoid dependency cycle
export const SETTINGS_NAVLINKS = [
  {
    key: "general",
    label: "General",
    description: "Configure general settings of your EUI.",
    path: "/settings?tab=general",
    component: General,
  },
  {
    key: "redirection",
    label: "Redirections",
    description: "Create and configure redirection rules.",
    path: "/settings?tab=redirection",
    component: Redirection,
  },
  {
    key: "password",
    label: "Security",
    description: "Secure knowledge base.",
    path: "/settings?tab=password",
    component: Security,
  },
  {
    key: "categories",
    label: "Manage categories",
    description: "Edit and reorder KB structure.",
    path: "/settings?tab=categories",
    component: Categories,
  },
];
