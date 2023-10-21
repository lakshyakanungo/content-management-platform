import React from "react";

import { Notes, Settings, ExternalLink } from "neetoicons";

import Logo from "../../../../../assets/images/Logo";

export const APP_NAME = "Scribble";

export const NAVLINKS = [
  {
    label: "Articles",
    description: "Manage and list all your KB articles",
    to: "/articles",
    icon: Notes,
  },
  {
    label: "Settings",
    description: "Configure KB settings",
    to: "/settings",
    icon: Settings,
  },
  {
    label: "Preview",
    description: "Launch your KB preview",
    to: "/kb",
    icon: ExternalLink,
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
