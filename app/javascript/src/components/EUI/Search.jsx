import React, { useEffect, useState } from "react";

import { Search as SearchIcon } from "@bigbinary/neeto-icons";
import { Input, Modal } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import euisApi from "apis/euis";
import { useKeyDown } from "hooks/useKeyDown";

import { SEARCH_SUFFIX } from "./constants";
import Description from "./Description";

const Search = ({ showSearchModal, setShowSearchModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);

  const { t } = useTranslation();

  useKeyDown(() => setShowSearchModal(true), "Slash");
  useKeyDown(() => {
    setShowSearchModal(false);
    setSearchTerm("");
    setArticles([]);
  }, "Escape");

  const history = useHistory();

  const { Header, Body } = Modal;

  const fetchArticles = async () => {
    try {
      const { data } = await euisApi.search(searchTerm);
      setArticles(data.articles);
      // console.log(data.articles);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleClick = article => {
    history.push(`${article.slug}`);
    setShowSearchModal(false);
    setSearchTerm("");
  };

  const handleKeyDown = event => {
    if (event.code === "ArrowUp") {
      setSelectedArticleIndex(prev =>
        prev > 0 ? prev - 1 : articles.length - 1
      );
    } else if (event.code === "ArrowDown") {
      setSelectedArticleIndex(prev =>
        prev < articles.length - 1 ? prev + 1 : 0
      );
    } else if (event.code === "Enter") {
      handleClick(articles[selectedArticleIndex]);
    }
  };

  useEffect(() => {
    if (searchTerm === "") setArticles([]);
    else fetchArticles();
  }, [searchTerm]);

  return (
    <Modal
      className="my-6"
      closeButton={false}
      isOpen={showSearchModal}
      size="medium"
      tabIndex={0}
      onClose={() => setShowSearchModal(false)}
      onKeyDown={handleKeyDown}
    >
      <Header className="p-2">
        <Input
          placeholder={t("eui.home.search.placeholder.long")}
          prefix={<SearchIcon />}
          suffix={SEARCH_SUFFIX}
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </Header>
      {articles.length > 0 && (
        <Body className="overflow-auto max-h-128">
          <ul>
            {articles.map((article, index) => (
              <li
                key={index}
                className={`neeto-ui-text-gray-700 neeto-ui-text-transform-capitalize p-2 cursor-pointer hover:neeto-ui-bg-gray-200 ${
                  index === selectedArticleIndex
                    ? "neeto-ui-bg-primary-500 neeto-ui-rounded neeto-ui-text-white"
                    : ""
                }`}
                onClick={() => handleClick(article)}
              >
                <div className="flex flex-col">
                  {/* <span>{article.body}</span> */}
                  <Description
                    searchTerm={searchTerm}
                    text={article.body}
                    title={article.title}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Body>
      )}
    </Modal>
  );
};

export default Search;
