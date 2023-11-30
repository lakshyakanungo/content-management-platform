import { path } from "ramda";
import { useQueries } from "react-query";

import articlesApi from "apis/articles";
import { fetchCategories } from "hooks/reactQuery/category/useCategory";

export const fetchArticle = async id => await articlesApi.show(id);

export const useFetchArticleAndCategories = ({ id }) =>
  useQueries([
    {
      queryKey: ["dashboard.article"],
      queryFn: () => fetchArticle(id),
      select: path(["data", "article"]),
      onError: error => logger.log(error),
      refetchOnMount: "always",
    },
    {
      queryKey: ["dashboard.categories"],
      queryFn: fetchCategories,
      select: path(["data", "categories"]),
      onError: error => logger.log(error),
      refetchOnMount: "always",
    },
  ]);
