import React, { useEffect, useState } from "react";

import { EditorContent } from "@bigbinary/neeto-editor";
import { Spinner } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import euisApi from "apis/euis";

const ShowArticle = ({ setSelectedArticleId }) => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  const { slug } = useParams();
  const history = useHistory();

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await euisApi.show(slug);
      setArticle(article);
      setSelectedArticleId(article.id);
    } catch (error) {
      logger.log(error);
      history.replace("/eui");
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
