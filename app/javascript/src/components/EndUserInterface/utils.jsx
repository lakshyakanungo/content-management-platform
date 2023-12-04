import React from "react";

import classNames from "classnames";
import { includes } from "ramda";

export const buildListItemClassName = ({ article, selectedArticleId }) =>
  classNames("neeto-ui-font-medium cursor-pointer", {
    "neeto-ui-text-primary-600": selectedArticleId === article.id,
    "neeto-ui-text-gray-600": selectedArticleId !== article.id,
  });

export const buildSearchItemClassName = (index, selectedArticleIndex) =>
  classNames(
    "neeto-ui-text-gray-700 neeto-ui-text-transform-capitalize p-2 cursor-pointer hover:neeto-ui-bg-gray-200 ",
    {
      "neeto-ui-bg-gray-200 neeto-ui-rounded neeto-ui-text-white":
        index === selectedArticleIndex,
    }
  );

export const getFirstArticle = articlesByCategories =>
  articlesByCategories[0][1][0];

export const getLinesFromBody = ({ text, searchTerm }) => {
  const lines = text.split(".");

  return lines.filter(line => line.includes(searchTerm)).slice(0, 3);
};

export const HighlightedLine = ({ line, highlight }) => {
  const parts = line.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <span>
      {parts.map((part, index) => (
        <span key={index}>
          {part.toLowerCase() === highlight.toLowerCase() ? (
            <mark className="bg-amber-400">{part}</mark>
          ) : (
            part
          )}
        </span>
      ))}
    </span>
  );
};

export const findActiveAccordianIndex = (articlesByCategory, article) => {
  const indexOfCategory = articlesByCategory.findIndex(([_, articles]) => {
    const ids = articles.map(article => article.id);

    return includes(article.id, ids);
  });

  return indexOfCategory;
};
