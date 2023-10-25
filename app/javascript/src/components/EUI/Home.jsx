import React, { useState, useEffect } from "react";

import { EditorContent } from "@bigbinary/neeto-editor";
import { Accordion, Spinner } from "neetoui";

import articlesApi from "apis/articles";

import { buildListItemClassName } from "./utils";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [articlesByCategory, setArticlesByCategory] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [selectedArticleContent, setSelectedArticleContent] = useState("");

  const fetchArticlesByCategory = async () => {
    try {
      const { data } = await articlesApi.fetchByCategory();
      // console.log(data);
      // console.log(results);
      setArticlesByCategory(data.groupedArticles);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = article => {
    setSelectedArticleId(article.id);
    setSelectedArticleContent(article.body);
  };

  useEffect(() => {
    fetchArticlesByCategory();
  }, []);

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
        <Accordion className="flex flex-col gap-4">
          {articlesByCategory.map(([category, articles]) => (
            <Accordion.Item
              key={articles[0].categoryId}
              title={category}
              titleProps={{ className: "neeto-ui-text-gray-700" }}
            >
              <ul className="list-none flex flex-col gap-2">
                {articles.map(article => (
                  <li
                    key={article.id}
                    className={buildListItemClassName({
                      article,
                      selectedArticleId,
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
      <div className="w-4/5 px-12 py-4">
        <EditorContent content={selectedArticleContent} />
      </div>
    </div>
  );
};

export default Home;
