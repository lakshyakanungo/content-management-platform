import React from "react";

import General from "./General";
import Menu from "./Menu";

const Settings = () => (
  <div className="w-full flex flex-row">
    <Menu />
    <General />
    {/* <Redirection /> */}
    {/* <ArticlePage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
  </div>
);

export default Settings;
