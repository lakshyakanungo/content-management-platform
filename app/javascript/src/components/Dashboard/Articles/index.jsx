import React, { useState, useEffect } from "react";

import { useFetchArticlesCountAndCategories } from "hooks/reactQuery/articles/useArticles";
import { useMenuStore } from "hooks/zustand/useMenuStore";
import { usePageStore } from "hooks/zustand/usePageStore";

import Menu from "./Menu";
import Page from "./Page";
import { updateQueryParameters } from "./utils";

const CategoryContext = React.createContext();

const Articles = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { activeMenuState } = useMenuStore();
  const { currentPageNumber, setCurrentPageNumber } = usePageStore();

  const [
    { data: { counts: articleCounts = {} } = {} },
    { data: { categories = [] } = {}, refetch: fetchCategories },
  ] = useFetchArticlesCountAndCategories();

  useEffect(() => {
    updateQueryParameters({ activeMenuState, currentPageNumber });
  }, [activeMenuState, currentPageNumber]);

  return (
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
  );
};

export default Articles;

export { CategoryContext };
