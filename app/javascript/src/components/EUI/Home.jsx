import React, { useState, useEffect } from "react";

import { Search as SearchIcon } from "@bigbinary/neeto-icons";
import { Accordion, Input, Spinner } from "neetoui";
import { useHistory, Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

import euiApi from "apis/eui";

import { SEARCH_SUFFIX } from "./constants";
import Search from "./Search";
import ShowArticle from "./ShowArticle";
import { buildListItemClassName, getFirstArticle } from "./utils";

const Home = ({ siteName }) => {
  const [loading, setLoading] = useState(true);
  const [articlesByCategory, setArticlesByCategory] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  // TODO: See if this naming with modal fine. In wheel.
  const [showSearchModal, setShowSearchModal] = useState(false);

  const history = useHistory();
  const match = useRouteMatch("/eui/:slug");

  const fetchArticlesByCategory = async () => {
    try {
      const {
        data: { groupedArticles },
      } = await euiApi.fetch();
      setArticlesByCategory(groupedArticles);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const routeToArticle = () => {
    const slug = match?.params?.slug;

    if (slug) {
      history.push(`/eui/${slug}`);
    } else {
      const firstArticle = getFirstArticle(articlesByCategory);
      history.push(`/eui/${firstArticle.slug}`);
    }
  };

  useEffect(() => {
    fetchArticlesByCategory();
  }, []);

  useEffect(() => {
    if (articlesByCategory.length !== 0) routeToArticle();
  }, [articlesByCategory]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex items-center font-bold p-4 text-base border neeto-ui-border-gray-100 neeto-ui-text-gray-800">
        <span className="w-1/6 absolute float-left">
          <Input
            className="w-56"
            placeholder="Search article here."
            prefix={<SearchIcon />}
            suffix={SEARCH_SUFFIX}
            onClick={() => setShowSearchModal(true)}
          />
        </span>
        <span className="mx-auto">{siteName}</span>
      </div>
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
                        selectedArticleId,
                      })}
                      onClick={() => history.push(`/eui/${article.slug}`)}
                    >
                      {article.title}
                    </li>
                  ))}
                </ul>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <Route
          // exact
          path="/eui/:slug"
          render={() => (
            <ShowArticle setSelectedArticleId={setSelectedArticleId} />
          )}
        />
        <Search
          setShowSearchModal={setShowSearchModal}
          showSearchModal={showSearchModal}
        />
      </div>
    </>
  );
};

export default Home;
