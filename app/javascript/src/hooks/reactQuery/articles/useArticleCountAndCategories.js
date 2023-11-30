import { path } from "ramda";
import { useQueries } from "react-query";

import articlesApi from "apis/articles";
import { fetchCategories } from "hooks/reactQuery/category/useCategory";

export const fetchArticlesCount = async () => await articlesApi.fetch();

export const useFetchArticlesCountAndCategories = () =>
  useQueries([
    {
      queryKey: ["dashboard.articles.count"],
      queryFn: fetchArticlesCount,
      select: path(["data", "counts"]),
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
