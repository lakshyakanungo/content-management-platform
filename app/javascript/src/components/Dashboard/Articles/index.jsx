import React, { useState, useEffect } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { Create, Edit } from "./Actions";
import Menu from "./Menu";
import Page from "./Page";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [activeMenuState, setActiveMenuState] = useState("All");

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [clickedArticle, setClickedArticle] = useState({});
  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [showEditArticle, setShowEditArticle] = useState(false);

  const [allArticles, setAllArticles] = useState([]);
  const [draftArticles, setDraftArticles] = useState([]);
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [displayArticles, setDisplayArticles] = useState([]);
  const [articleCounts, setArticleCounts] = useState({
    all: 0,
    draft: 0,
    published: 0,
  });
  // console.log(selectedCategories, "Selected categories");

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      // console.log(categories);
      setCategories(categories);
    } catch (error) {
      logger.log(error);
    }
  };

  const fetchArticles = async () => {
    try {
      const {
        data: {
          articles: { all, draft, published },
        },
      } = await articlesApi.fetch();
      // console.log("all", all);
      // console.log("draft", draft);
      // console.log("published", published);
      setDraftArticles(draft);
      setPublishedArticles(published);
      setAllArticles(all);
      setDisplayArticles(all);
      setArticleCounts({
        all: all.length,
        draft: draft.length,
        published: published.length,
      });
    } catch (error) {
      logger.log(error);
    }
  };

  const handleMenuStateChange = menuState => {
    setActiveMenuState(menuState);

    if (menuState === "All") setDisplayArticles(allArticles);
    else if (menuState === "Draft") setDisplayArticles(draftArticles);
    else setDisplayArticles(publishedArticles);
  };

  const fetchArticlesAndCategories = async () => {
    setLoading(true);
    await Promise.all([fetchCategories(), fetchArticles()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticlesAndCategories();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex-grow flex-shrink flex flex-row">
      {showCreateArticle && (
        <Create
          categories={categories}
          refetch={fetchArticlesAndCategories}
          setShowCreateArticle={setShowCreateArticle}
        />
      )}
      {showEditArticle && (
        <Edit
          article={clickedArticle}
          categories={categories}
          refetch={fetchArticlesAndCategories}
          setShowEditArticle={setShowEditArticle}
        />
      )}
      {!showCreateArticle && !showEditArticle && (
        <>
          <Menu
            activeMenuState={activeMenuState}
            articleCounts={articleCounts}
            categories={categories}
            fetchCategories={fetchCategories}
            handleMenuStateChange={handleMenuStateChange}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            showMenu={showMenu}
          />
          <Page
            activeMenuState={activeMenuState}
            articles={displayArticles}
            categories={categories}
            refetch={fetchArticlesAndCategories}
            selectedCategories={selectedCategories}
            setClickedArticle={setClickedArticle}
            setDisplayArticles={setDisplayArticles}
            setSelectedCategories={setSelectedCategories}
            setShowCreateArticle={setShowCreateArticle}
            setShowEditArticle={setShowEditArticle}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
          />
        </>
      )}
    </div>
  );
};

export default Articles;
