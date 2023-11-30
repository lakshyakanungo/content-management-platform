import React, { useState, useEffect } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";

import { useFetchArticlesCountAndCategories } from "hooks/reactQuery/articles/useArticleCountAndCategories";

import Menu from "./Menu";
import Page from "./Page";
import { updateQueryParameters } from "./utils";

const CategoryContext = React.createContext();
const MenuContext = React.createContext();
const PageContext = React.createContext();
const SelectedArticlesContext = React.createContext();

const Articles = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [activeMenuState, setActiveMenuState] = useState("all");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
  const [
    {
      data: articleCounts,
      refetch: fetchArticlesCount,
      isFetching: isFetchingArticlesCount,
    },
    {
      data: categories,
      refetch: fetchCategories,
      isFetching: isFetchingCategories,
    },
  ] = useFetchArticlesCountAndCategories();

  const fetchArticlesCountAndCategories = () => {
    fetchArticlesCount();
    fetchCategories();
  };

  useEffect(() => {
    updateQueryParameters({ activeMenuState, currentPageNumber });
  }, [activeMenuState, currentPageNumber]);

  if (isFetchingArticlesCount || isFetchingCategories) {
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
