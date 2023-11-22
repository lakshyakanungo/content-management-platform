import classNames from "classnames";

export const buildListItemClassName = ({ article, selectedArticleId }) =>
  classNames("neeto-ui-font-medium cursor-pointer", {
    "neeto-ui-text-primary-600": selectedArticleId === article.id,
    "neeto-ui-text-gray-600": selectedArticleId !== article.id,
  });

export const getFirstArticle = articlesByCategories =>
  articlesByCategories[0][1][0];
