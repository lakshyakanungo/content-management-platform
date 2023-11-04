import React, { useEffect, useState } from "react";

import { EditorContent } from "@bigbinary/neeto-editor";
import { Spinner } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom";

import euiApi from "apis/eui";

const ShowArticle = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  const { slug } = useParams();

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await euiApi.show(slug);
      setArticle(article);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-4/5 px-12 py-4">
      <EditorContent content={article.body} />
    </div>
  );
};

export default ShowArticle;
