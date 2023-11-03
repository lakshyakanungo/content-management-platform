import React, { useState, useEffect } from "react";

import { Accordion, Spinner } from "neetoui";
import { useHistory, Route } from "react-router-dom";

import euiApi from "apis/eui";

import ShowArticle from "./ShowArticle";
import { buildListItemClassName } from "./utils";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [articlesByCategory, setArticlesByCategory] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState("");

  const history = useHistory();

  const fetchArticlesByCategory = async () => {
    try {
      const {
        data: { groupedArticles },
      } = await euiApi.fetchByCategory();
      setArticlesByCategory(groupedArticles);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = article => {
    setSelectedArticle(article);
    history.push(`/kb/${article.slug}`);
  };

  useEffect(() => {
    fetchArticlesByCategory();
  }, []);

  useEffect(() => {
    if (articlesByCategory.length !== 0) {
      setSelectedArticle(articlesByCategory[0][1][0]);
      history.replace(`/kb/${articlesByCategory[0][1][0].slug}`);
    }
  }, [articlesByCategory]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-grow flex w-full">
      <div className="w-1/5 p-6 border neeto-ui-border-gray-100">
        <Accordion className="flex flex-col gap-4" defaultActiveKey={0}>
          {articlesByCategory.map(([categoryName, articles]) => (
            <Accordion.Item
              key={categoryName}
              title={categoryName}
              titleProps={{ className: "neeto-ui-text-gray-700" }}
            >
              <ul className="list-none flex flex-col gap-2">
                {articles.map(article => (
                  <li
                    key={article.id}
                    className={buildListItemClassName({
                      article,
                      selectedArticle,
                    })}
                    onClick={() => handleClick(article)}
                  >
                    {article.title}
                  </li>
                ))}
              </ul>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      <Route exact component={ShowArticle} path="/kb/:slug" />
    </div>
  );
};

export default Home;
