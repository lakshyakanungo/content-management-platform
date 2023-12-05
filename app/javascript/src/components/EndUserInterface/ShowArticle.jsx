import React from "react";

import { EditorContent } from "neetoeditor";
import { Spinner } from "neetoui";
import { useParams, useHistory } from "react-router-dom";

import { useFetchArticle } from "hooks/reactQuery/endUserInterface/usePublicArticlesApi";
import Header from "neetomolecules/Header";

import { findActiveAccordianIndex } from "./utils";

const ShowArticle = ({
  setSelectedArticleId,
  setActiveAccordianIndex,
  articlesByCategory,
}) => {
  const { slug } = useParams();
  const history = useHistory();

  const { data: { article = {} } = {}, isLoading } = useFetchArticle(slug, {
    onSuccess: ({ article }) => {
      setSelectedArticleId(article.id);
      setActiveAccordianIndex(
        findActiveAccordianIndex(articlesByCategory, article)
      );
    },
    onError: () => {
      history.replace("/eui");
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-4/5 px-12 py-4">
      <Header title={article.title} />
      <EditorContent content={article.body} />
    </div>
  );
};

export default ShowArticle;
