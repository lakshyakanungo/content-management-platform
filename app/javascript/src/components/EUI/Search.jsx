import React, { useEffect, useState } from "react";

import { Search as SearchIcon } from "@bigbinary/neeto-icons";
import { Input, Modal } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import euiApi from "apis/eui";
import { useKeyDown } from "hooks/useKeyDown";

import { SEARCH_SUFFIX } from "./constants";

const Search = ({ showSearchModal, setShowSearchModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // TODO: See if to keep name as articles or change it to articles
  const [articles, setArticles] = useState([]);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);

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
      const { data } = await euiApi.search(searchTerm);
      setArticles(data.articles);
      // console.log(data);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleClick = article => {
    history.push(`${article.slug}`);
    setShowSearchModal(false);
    setSearchTerm("");
  };

  // const handleKeyDown = e => {
  //   console.log(e);
  //   if (e.code === "ArrowUp") {
  //     setSelectedArticleIndex(prev => (prev > 0 ? prev - 1 : articles.length - 1));
  //   } else if (e.code === "ArrowDown") {
  //     setSelectedArticleIndex(prev => (prev < articles.length - 1 ? prev + 1 : 0));
  //   }
  // };

  const handleKeyDown = event => {
    // console.log(event);
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

    // TODO: Choose this design weather to reset it to top .
    // setSelectedArticleIndex(0);
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
          placeholder="Search article title or content"
          prefix={<SearchIcon />}
          suffix={SEARCH_SUFFIX}
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </Header>
      {articles.length > 0 && (
        <Body>
          <ul className="max-h-60 overflow-scroll">
            {articles.map((article, index) => (
              <li
                key={index}
                className={`neeto-ui-text-gray-700 neeto-ui-text-transform-capitalize p-2 cursor-pointer hover:neeto-ui-bg-gray-200 ${
                  index === selectedArticleIndex
                    ? "neeto-ui-bg-primary-500"
                    : ""
                }`}
                onClick={() => handleClick(article)}
              >
                {article.title}
              </li>
            ))}
          </ul>
        </Body>
      )}
    </Modal>
  );
};

export default Search;
