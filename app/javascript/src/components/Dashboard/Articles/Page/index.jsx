import React, { useState, useEffect } from "react";

import Header from "@bigbinary/neeto-molecules/Header";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { Button } from "neetoui";

import articlesApi from "apis/articles";
import EmptyState from "components/commons/EmptyState";
import Container from "neetomolecules/Container";

import SubHeader from "./SubHeader";

import { buildArticlesColumnData } from "../constants";
import Table from "../Table";

const ArticlePage = ({
  isMenuOpen,
  setIsMenuOpen,
  categories,
  articles,
  // setArticles,
  setDisplayArticles,
  fetchArticles,
  loading,
  selectedCategories,
  setSelectedCategories,
  setShowCreateArticle,
}) => {
  // const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);

  const fetchSearchResults = async () => {
    try {
      const selectedCategoriesIds = selectedCategories.map(
        category => category.id
      );

      const {
        data: { articles },
      } = await articlesApi.search({ searchTerm, selectedCategoriesIds });
      // console.log(articles);
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
      fetchArticles();
    } catch (error) {
      logger.log(error);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const handleBulkStatusChange = async ({ ids, status }) => {
    try {
      await articlesApi.updateMultiple({
        ids,
        payload: { status },
      });
      fetchArticles();
    } catch (error) {
      logger.log(error);
    }
  };

  const handleDelete = async id => {
    try {
      await articlesApi.deleteArticle(id);
      await fetchArticles();
    } catch (error) {
      logger.log(error);
    }
  };

  const handleBulkDelete = async ids => {
    try {
      await articlesApi.deleteMultiple(ids);
      fetchArticles();
    } catch (error) {
      logger.log(error);
    }
  };

  const handleBulkCategoryChange = async ({ ids, category_id }) => {
    try {
      await articlesApi.updateMultiple({
        ids,
        payload: { category_id },
      });
      fetchArticles();
    } catch (error) {
      logger.log(error);
    }
  };

  const [columns, setColumns] = useState(
    buildArticlesColumnData({ handleStatusChange, handleDelete })
  );

  useEffect(() => {
    // if (!(searchTerm === "" && selectedCategories.length === 0))
    fetchSearchResults();
  }, [searchTerm, selectedCategories]);

  if (loading) {
    return <PageLoader />;
  }

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
          setIsMenuOpen(!isMenuOpen);
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
        handeStatusChange={handleStatusChange}
        handleBulkCategoryChange={handleBulkCategoryChange}
        handleBulkDelete={handleBulkDelete}
        handleBulkStatusChange={handleBulkStatusChange}
        handleDelete={handleDelete}
        selectedArticleIds={selectedArticleIds}
        selectedCategories={selectedCategories}
        setColumns={setColumns}
        setSelectedCategories={setSelectedCategories}
      />
      {articles.length ? (
        <Table
          articles={articles}
          columnData={columns}
          fetchArticles={fetchArticles}
          selectedArticleIds={selectedArticleIds}
          setSelectedArticleIds={setSelectedArticleIds}
        />
      ) : (
        <EmptyState
          primaryAction={() => {}}
          primaryActionLabel="Add article"
          subtitle="You have not yet created an article. Create an article using the CTA given below."
          title="There are no articles."
        />
      )}
    </Container>
  );
};

export default ArticlePage;
