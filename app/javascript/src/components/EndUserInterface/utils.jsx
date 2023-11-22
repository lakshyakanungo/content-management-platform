import React from "react";

import classNames from "classnames";

export const buildListItemClassName = ({ article, selectedArticleId }) =>
  classNames("neeto-ui-font-medium cursor-pointer", {
    "neeto-ui-text-primary-600": selectedArticleId === article.id,
    "neeto-ui-text-gray-600": selectedArticleId !== article.id,
  });

export const getFirstArticle = articlesByCategories =>
  articlesByCategories[0][1][0];

export const getLinesFromBody = ({ text, title, searchTerm }) => {
  const body = text.split(title)[1];
  const lines = body.split(".");

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
