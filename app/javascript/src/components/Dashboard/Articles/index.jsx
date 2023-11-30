import React, { useState, useEffect } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";

import { useFetchArticlesCountAndCategories } from "hooks/reactQuery/articles/useArticleCountAndCategories";
import { useMenuStore } from "hooks/zustand/useMenuStore";
import { usePageStore } from "hooks/zustand/usePageStore";

import Menu from "./Menu";
import Page from "./Page";
import { updateQueryParameters } from "./utils";

const CategoryContext = React.createContext();
const PageContext = React.createContext();

const Articles = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { activeMenuState } = useMenuStore();
  const { currentPageNumber, setCurrentPageNumber } = usePageStore();

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
        refetch: fetchArticlesCountAndCategories,
      }}
    >
      <CategoryContext.Provider
        value={{
          categories,
          selectedCategories,
          setSelectedCategories,
          fetchCategories,
        }}
      >
        <Menu
          articleCounts={articleCounts}
          setCurrentPageNumber={setCurrentPageNumber}
        />
        <Page />
      </CategoryContext.Provider>
    </PageContext.Provider>
  );
};

export default Articles;

export { PageContext, CategoryContext };
