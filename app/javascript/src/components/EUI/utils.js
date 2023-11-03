import classNames from "classnames";

export const buildListItemClassName = ({ article, selectedArticle }) =>
  classNames("neeto-ui-font-medium", {
    "neeto-ui-text-primary-600": selectedArticle.id === article.id,
    "neeto-ui-text-gray-600": selectedArticle.id !== article.id,
  });
