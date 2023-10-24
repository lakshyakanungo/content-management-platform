import React, { useState, useEffect } from "react";

import { EditorContent } from "@bigbinary/neeto-editor";
import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import classNames from "classnames";
import { Accordion } from "neetoui";

import articlesApi from "apis/articles";

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
      setArticlesByCategory(data.grouped_articles);
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

  const buildListItemClassName = article =>
    // console.log(article);
    classNames("neeto-ui-font-medium", {
      "neeto-ui-text-primary-600": selectedArticleId === article.id,
      "neeto-ui-text-gray-600": selectedArticleId !== article.id,
    });

  useEffect(() => {
    fetchArticlesByCategory();
  }, []);

  if (loading) {
    <div className="h-screen">
      <PageLoader />
    </div>;
  }

  // console.log(selectedArticleContent);

  return (
    <div className="flex-grow flex w-full">
      <div className="w-1/5 p-6 border neeto-ui-border-gray-100">
        <Accordion className="flex flex-col gap-4">
          {articlesByCategory.map(([category, articles]) => (
            <Accordion.Item
              key={articles[0].category_id}
              title={category}
              titleProps={{ className: "neeto-ui-text-gray-700" }}
            >
              {/* {category.name} */}
              <ul className="list-none flex flex-col gap-2">
                {articles.map(article => (
                  <li
                    className={buildListItemClassName(article)}
                    key={article.id}
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
