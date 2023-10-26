import React, { useState, useEffect } from "react";

import { Button } from "neetoui";

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
  setShowCreateArticle,
  setShowEditArticle,
  setClickedArticle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
  const [visibleTableColumns, setVisibleTableColumns] = useState([]);

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
    // if (!(searchTerm === "" && selectedCategories.length === 0)) {
    fetchSearchResults();
    // }
  }, [searchTerm, selectedCategories]);

  return (
    <Container>
      <Header
        title="All articles"
        actionBlock={
          <Button
            icon="ri-add-line"
            label="Add article"
            size="small"
            onClick={() => setShowCreateArticle(true)}
          />
        }
        menuBarToggle={() => {
          setShowMenu(!showMenu);
        }}
        searchProps={{
          value: searchTerm,
          onChange: event => setSearchTerm(event.target.value),
          placeholder: "Search article title",
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
        setClickedArticle={setClickedArticle}
        setSelectedArticleIds={setSelectedArticleIds}
        setSelectedCategories={setSelectedCategories}
        setShowEditArticle={setShowEditArticle}
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
          primaryActionLabel="Clear search"
          searchText={searchTerm}
          subtitle="We could not find any articles based on your search term. Try a different keyword or add a new article."
          title={`No results for "${searchTerm}"`}
        />
      ) : (
        <EmptyState
          primaryActionLabel="Add article"
          subtitle="You have not yet created an article. Create an article using the CTA given below."
          title="There are no articles."
          primaryAction={() => {
            setShowCreateArticle(true);
          }}
        />
      )}
    </Container>
  );
};

export default Page;
