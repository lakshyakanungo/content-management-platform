import React from "react";

import { Notes, Settings, ExternalLink } from "neetoicons";

import i18n from "common/i18n";

import Logo from "../../../../../assets/images/Logo";

export const APP_NAME = "Scribble";

export const NAVLINKS = [
  {
    label: i18n.t("dashboard.sidebar.navlinks.articles.label"),
    description: i18n.t("dashboard.sidebar.navlinks.articles.description"),
    to: "/articles",
    icon: Notes,
  },
  {
    label: i18n.t("dashboard.sidebar.navlinks.settings.label"),
    description: i18n.t("dashboard.sidebar.navlinks.settings.description"),
    to: "/settings",
    icon: Settings,
  },
  {
    label: i18n.t("dashboard.sidebar.navlinks.eui.label"),
    description: i18n.t("dashboard.sidebar.navlinks.eui.description"),
    to: "/kb",
    icon: ExternalLink,
    target: "_blank",
  },
];

export const ORGANIZATION_INFO = {
  name: "Scribble",
  subdomain: "bigbinary.com",
  logo: <Logo />,
};

export const PROFILE_INFO = {
  name: `Oliver Smith`,
  imageUrl: "https://i.pravatar.cc/300",
  email: "oliver@example.com",
};
