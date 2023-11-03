import React, { useState, useEffect } from "react";

import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import EmptyState from "components/commons/EmptyState";
import Container from "neetomolecules/Container";
import Header from "neetomolecules/Header";

import SubHeader from "./SubHeader";
import Table from "./Table";

const Page = ({
  activeMenuState,
  showMenu,
  setShowMenu,
  categories,
  articles,
  setDisplayArticles,
  refetch,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
  const [visibleTableColumns, setVisibleTableColumns] = useState([]);

  const { t } = useTranslation();

  const history = useHistory();

  const fetchSearchResults = async () => {
    try {
      const selectedCategoriesIds = selectedCategories.map(
        category => category.id
      );
      const query = searchTerm.trim();
      const {
        data: { articles },
      } = await articlesApi.search({
        searchTerm: query,
        selectedCategoriesIds,
        activeMenuState,
      });
      setDisplayArticles(articles);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleStatusChange = async ({ id, status }) => {
    try {
      await articlesApi.update({
        id,
        payload: { status },
      });
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

  const handleDelete = async id => {
    try {
      await articlesApi.deleteArticle(id);
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm, selectedCategories]);

  return (
    <Container>
      <Header
        title={t("dashboard.articles.page.header.title")}
        actionBlock={
          <Button
            icon="ri-add-line"
            label={t("dashboard.articles.page.header.buttonLabel")}
            size="small"
            // onClick={() => setShowCreateArticle(true)}
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
        articles={articles}
        categories={categories}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
        refetch={refetch}
        selectedArticleIds={selectedArticleIds}
        selectedCategories={selectedCategories}
        setSelectedArticleIds={setSelectedArticleIds}
        setSelectedCategories={setSelectedCategories}
        setVisibleTableColumns={setVisibleTableColumns}
      />
      {articles.length ? (
        <Table
          articles={articles}
          columnData={visibleTableColumns}
          selectedArticleIds={selectedArticleIds}
          setSelectedArticleIds={setSelectedArticleIds}
        />
      ) : searchTerm.length ? (
        <EmptyState
          primaryAction={() => setSearchTerm("")}
          searchText={searchTerm}
          subtitle={t("dashboard.articles.page.emptyState.forSearch.subtitle")}
          primaryActionLabel={t(
            "dashboard.articles.page.emptyState.forSearch.primaryActionLabel"
          )}
          title={t("dashboard.articles.page.emptyState.forSearch.title", {
            title: searchTerm,
          })}
        />
      ) : (
        <EmptyState
          primaryAction={() => history.push("/articles/new")}
          subtitle={t("dashboard.articles.page.emptyState.general.subtitle")}
          title={t("dashboard.articles.page.emptyState.general.title")}
          primaryActionLabel={t(
            "dashboard.articles.page.emptyState.general.primaryActionLabel"
          )}
        />
      )}
    </Container>
  );
};

export default Page;
