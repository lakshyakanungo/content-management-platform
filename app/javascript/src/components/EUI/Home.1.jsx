import React, { useState, useEffect } from "react";

import { Accordion } from "neetoui";
import ReactHtmlParser from "react-html-parser";

import articlesApi from "apis/articles";
import Container from "neetomolecules/Container";

const Home = () => {
  const [articlesByCategory, setArticlesByCategory] = useState([]);
  const [articleContent, setArticleContent] = useState("");

  const fetchArticlesByCategory = async () => {
    try {
      const { data } = await articlesApi.fetchByCategory();
      // console.log(data);
      // console.log(results);
      setArticlesByCategory(data.grouped_articles);
    } catch (error) {
      logger.log(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesByCategory();
  }, []);

  return (
    <Container className="h-screen flex flex-col">
      <div className="w-full text-center font-bold p-4 text-base border neeto-ui-border-gray-100 neeto-ui-text-gray-800">
        Spinkart
      </div>
      <div className="flex-grow flex w-full">
        <div
          className="w-1/5
          p-6 border neeto-ui-border-gray-100"
        >
          <Accordion>
            {/* <Accordion.Item
              title="Accordion 1"
              // className="flex flex-row-reverse"
              // titleProps={{ className: "flex flex-row-reverse" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Accordion.Item> */}
            {articlesByCategory.map(([category, articles]) => (
              <Accordion.Item key={articles[0].category_id} title={category}>
                {/* {category.name} */}
                {articles.map(article => (
                  <li
                    key={article.id}
                    onClick={() => setArticleContent(article.body)}
                  >
                    {article.title}
                  </li>
                ))}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div className="w-4/5 px-12 py-4">
          {ReactHtmlParser(articleContent)}
        </div>
      </div>
    </Container>
  );
};
exports.Home = Home;
