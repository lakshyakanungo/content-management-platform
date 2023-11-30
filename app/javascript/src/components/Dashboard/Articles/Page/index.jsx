import React, { useState, useEffect, useContext } from "react";

import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import {
  useHandleDelete,
  useHandleStatusChange,
} from "hooks/reactQuery/articles/page/useUpdate";
import Container from "neetomolecules/Container";
import Header from "neetomolecules/Header";

import Empty from "./Empty";
import SubHeader from "./SubHeader";
import Table from "./Table";

import { CategoryContext, MenuContext, PageContext } from "..";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [visibleTableColumns, setVisibleTableColumns] = useState([]);
  const [totalArticlesCount, setTotalArticlesCount] = useState(0);

  const { selectedCategories } = useContext(CategoryContext);
  const { showMenu, setShowMenu, activeMenuState } = useContext(MenuContext);
  const { currentPageNumber, setCurrentPageNumber, refetch } =
    useContext(PageContext);

  const { mutate: handleStatusChange } = useHandleStatusChange({ refetch });
  const { mutate: handleDelete } = useHandleDelete({ refetch });

  const { t } = useTranslation();

  const history = useHistory();

  const fetchSearchResults = async () => {
    try {
      const selectedCategoriesIds = selectedCategories.map(
        category => category.id
      );
      const query = searchTerm.trim();
      const {
        data: { articles, totalCount },
      } = await articlesApi.search({
        searchTerm: query,
        selectedCategoriesIds,
        activeMenuState,
        currentPageNumber,
      });
      setArticles(articles);
      setTotalArticlesCount(totalCount);
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm, selectedCategories, activeMenuState, currentPageNumber]);

  return (
    <Container>
      <Header
        title={t("dashboard.articles.page.header.title")}
        actionBlock={
          <Button
            icon="ri-add-line"
            label={t("dashboard.articles.page.header.buttonLabel")}
            size="small"
            onClick={() => history.push("/articles/new")}
          />
        }
        menuBarToggle={() => {
          setShowMenu(!showMenu);
        }}
        searchProps={{
          value: searchTerm,
          onChange: event => setSearchTerm(event.target.value),
          placeholder: t("dashboard.articles.page.header.searchPlaceholder"),
        }}
      />
      <SubHeader
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
        setCurrentPageNumber={setCurrentPageNumber}
        setVisibleTableColumns={setVisibleTableColumns}
        totalArticlesCount={totalArticlesCount}
      />
      {articles.length ? (
        <Table
          articles={articles}
          columnData={visibleTableColumns}
          totalArticlesCount={totalArticlesCount}
        />
      ) : (
        <Empty
          history={history}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          setSearchTerm={setSearchTerm}
        />
      )}
    </Container>
  );
};

export default Page;
