import React, { useEffect, useState } from "react";

import { Search as SearchIcon } from "neetoicons";
import { Input, Modal } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { useSearch } from "hooks/reactQuery/endUserInterface/usePublicArticlesApi";
import { useKeyDown } from "hooks/useKeyDown";

import SearchItem from "./Item";

import { SEARCH_SUFFIX } from "../constants";
import { buildSearchItemClassName } from "../utils";

const Search = ({ showSearchModal, setShowSearchModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);

  useSearch(searchTerm, {
    onSuccess: ({ articles }) => setArticles(articles),
  });

  useKeyDown(() => setShowSearchModal(true), "Slash");
  useKeyDown(() => {
    setShowSearchModal(false);
    setSearchTerm("");
  }, "Escape");

  const { Header, Body } = Modal;
  const history = useHistory();
  const { t } = useTranslation();

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
                className={buildSearchItemClassName(
                  index,
                  selectedArticleIndex
                )}
                onClick={() => handleClick(article)}
              >
                <SearchItem
                  searchTerm={searchTerm}
                  text={article.body}
                  title={article.title}
                />
              </li>
            ))}
          </ul>
        </Body>
      )}
    </Modal>
  );
};

export default Search;
