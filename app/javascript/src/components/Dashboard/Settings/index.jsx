import React from "react";

import Menu from "./Menu";
import Security from "./Security";

const Settings = () => (
  <div className="w-full flex flex-row">
    <Menu />
    {/* <General /> */}
    {/* <Redirection /> */}
    <Security />
    {/* <ArticlePage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
  </div>
);

export default Settings;
