import React, { useEffect } from "react";

import { useFetchArticlesCount } from "hooks/reactQuery/articles/useArticles";
import { useMenuStore } from "hooks/zustand/useMenuStore";
import { usePageStore } from "hooks/zustand/usePageStore";

import Menu from "./Menu";
import Page from "./Page";
import { updateQueryParameters } from "./utils";

const Articles = () => {
  const { activeMenuState } = useMenuStore();
  const { currentPageNumber, setCurrentPageNumber } = usePageStore();

  const { data: { counts: articleCounts = {} } = {} } = useFetchArticlesCount();

  useEffect(() => {
    updateQueryParameters({ activeMenuState, currentPageNumber });
  }, [activeMenuState, currentPageNumber]);

  return (
    <>
      <Menu
        articleCounts={articleCounts}
        setCurrentPageNumber={setCurrentPageNumber}
      />
      <Page />
    </>
  );
};

export default Articles;
