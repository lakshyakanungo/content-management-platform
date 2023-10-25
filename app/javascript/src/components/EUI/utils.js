import classNames from "classnames";

export const buildListItemClassName = ({ article, selectedArticleId }) =>
  classNames("neeto-ui-font-medium", {
    "neeto-ui-text-primary-600": selectedArticleId === article.id,
    "neeto-ui-text-gray-600": selectedArticleId !== article.id,
  });
