import React, { useState } from "react";

import ArticlePage from "./ArticlePage";
import Menu from "./Menu";

import Sidebar from "../../commons/MySidebar";

const Articles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="w-full flex flex-row">
      <Sidebar />
      <Menu isMenuOpen={isMenuOpen} />
      <ArticlePage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Articles;
