import React from "react";

import { EditorContent } from "@bigbinary/neeto-editor";
import Header from "@bigbinary/neeto-molecules/Header";
import { Spinner } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { useFetchArticle } from "hooks/reactQuery/endUserInterface/usePublicArticlesApi";

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
