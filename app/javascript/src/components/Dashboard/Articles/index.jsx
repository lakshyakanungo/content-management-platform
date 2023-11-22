import React, { useState, useEffect } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Menu from "./Menu";
import Page from "./Page";
import { updateQueryParameters } from "./utils";

const CategoryContext = React.createContext();
const MenuContext = React.createContext();
const PageContext = React.createContext();
const SelectedArticlesContext = React.createContext();

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [activeMenuState, setActiveMenuState] = useState("all");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
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

  useEffect(() => {
    updateQueryParameters({ activeMenuState, currentPageNumber });
  }, [activeMenuState, currentPageNumber]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <PageContext.Provider
      value={{
        currentPageNumber,
        setCurrentPageNumber,
        refetch: fetchArticlesCountAndCategories,
      }}
    >
      <MenuContext.Provider
        value={{ showMenu, setShowMenu, activeMenuState, setActiveMenuState }}
      >
        <CategoryContext.Provider
          value={{
            categories,
            selectedCategories,
            setSelectedCategories,
            fetchCategories,
          }}
        >
          <SelectedArticlesContext.Provider
            value={{ selectedArticleIds, setSelectedArticleIds }}
          >
            <Menu
              articleCounts={articleCounts}
              setCurrentPageNumber={setCurrentPageNumber}
              setSelectedArticleIds={setSelectedArticleIds}
            />
            <Page />
          </SelectedArticlesContext.Provider>
        </CategoryContext.Provider>
      </MenuContext.Provider>
    </PageContext.Provider>
  );
};

export default Articles;

export { PageContext, MenuContext, CategoryContext, SelectedArticlesContext };
