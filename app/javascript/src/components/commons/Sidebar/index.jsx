import React from "react";

import { Sidebar as NeetoUISidebar } from "neetoui/layouts";

import {
  APP_NAME,
  ORGANIZATION_INFO,
  PROFILE_INFO,
  NAVLINKS,
} from "./constants";

const Sidebar = () => (
  <NeetoUISidebar
    appName={APP_NAME}
    navLinks={NAVLINKS}
    organizationInfo={ORGANIZATION_INFO}
    profileInfo={PROFILE_INFO}
  />
);

export default Sidebar;
