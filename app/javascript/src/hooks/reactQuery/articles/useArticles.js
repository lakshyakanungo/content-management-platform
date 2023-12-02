import { path } from "ramda";
import { useQueries } from "react-query";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import { QUERY_KEYS } from "constants/query";

const { CATEGORIES, ARTICLES_COUNT } = QUERY_KEYS;

export const useFetchArticlesCountAndCategories = () =>
  useQueries([
    {
      queryKey: [ARTICLES_COUNT],
      queryFn: articlesApi.fetch,
      select: path(["data"]),
      refetchOnMount: "always",
    },
    {
      queryKey: [CATEGORIES],
      queryFn: categoriesApi.fetch,
      select: path(["data"]),
      refetchOnMount: "always",
    },
  ]);
