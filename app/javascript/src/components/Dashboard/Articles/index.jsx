import React, { useState, useEffect } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import AddCategory from "./AddCategory";
import Menu from "./Menu";
import ArticlePage from "./Page";

const Articles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(true);

  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [draftArticles, setDraftArticles] = useState([]);
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [displayArticles, setDisplayArticles] = useState([]);

  const [activeMenuState, setActiveMenuState] = useState("All");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // console.log(selectedCategories, "Selected categories");
  const coz_husky = articles;
  coz_husky;
  //delete upper two lines later.

  const handleMenuStateChange = state => {
    setActiveMenuState(state);

    if (state === "All") setDisplayArticles(allArticles);
    else if (state === "Draft") setDisplayArticles(draftArticles);
    else setDisplayArticles(publishedArticles);
  };

  const handleAddCategory = async ({ category }) => {
    // handle submit here
    // console.log(category, "check");
    try {
      await categoriesApi.create({ name: category });
      fetchCategories();
    } catch (error) {
      logger.log(error);
    } finally {
      setShowAddCategoryModal(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      // console.log(categories);
      setCategories(categories);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      setArticlesLoading(true);
      const {
        data: {
          articles: { draft, published },
        },
      } = await articlesApi.fetch();
      // console.log("draft", draft);
      // console.log("published", published);
      const allArticles = [...draft, ...published];
      // console.log("articles", allArticles);
      setDraftArticles(draft);
      setPublishedArticles(published);
      setAllArticles(allArticles);
      setArticles(allArticles);
      setDisplayArticles(allArticles);
      // setArticles(data.articles.published);
    } catch (error) {
      logger.log(error);
    } finally {
      setArticlesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="w-full flex flex-row">
      <Menu
        activeMenuState={activeMenuState}
        categories={categories}
        handleMenuStateChange={handleMenuStateChange}
        isMenuOpen={isMenuOpen}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        setShowAddCategoryModal={setShowAddCategoryModal}
        showAddCategoryModal={showAddCategoryModal}
      />
      <ArticlePage
        articles={displayArticles}
        articlesLoading={articlesLoading}
        categories={categories}
        fetchArticles={fetchArticles}
        isMenuOpen={isMenuOpen}
        selectedCategories={selectedCategories}
        setArticles={setArticles}
        setDisplayArticles={setDisplayArticles}
        setIsMenuOpen={setIsMenuOpen}
        setSelectedCategories={setSelectedCategories}
      />
      <AddCategory
        handleAddCategory={handleAddCategory}
        setShowAddCategoryModal={setShowAddCategoryModal}
        showAddCategoryModal={showAddCategoryModal}
      />
    </div>
  );
};

export default Articles;
