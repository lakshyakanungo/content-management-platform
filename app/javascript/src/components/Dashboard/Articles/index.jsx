import React, { useState, useEffect } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Menu from "./Menu";
import Page from "./Page";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [activeMenuState, setActiveMenuState] = useState("all");

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [articleCounts, setArticleCounts] = useState({
    all: 0,
    draft: 0,
    published: 0,
  });

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.log(error);
    }
  };

  const fetchArticlesCount = async () => {
    try {
      const {
        data: {
          counts: { all, draft, published },
        },
      } = await articlesApi.fetch();
      // console.log(all, draft, published);
      setArticleCounts({ all, draft, published });
    } catch (error) {
      logger.log(error);
    }
  };

  const fetchArticlesCountAndCategories = async () => {
    setLoading(true);
    await Promise.all([fetchCategories(), fetchArticlesCount()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticlesCountAndCategories();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex-grow flex-shrink flex flex-row">
      <Menu
        activeMenuState={activeMenuState}
        articleCounts={articleCounts}
        categories={categories}
        fetchCategories={fetchCategories}
        selectedCategories={selectedCategories}
        setActiveMenuState={setActiveMenuState}
        setSelectedCategories={setSelectedCategories}
        showMenu={showMenu}
      />
      <Page
        activeMenuState={activeMenuState}
        categories={categories}
        refetch={fetchArticlesCountAndCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
      />
    </div>
  );
};

export default Articles;
