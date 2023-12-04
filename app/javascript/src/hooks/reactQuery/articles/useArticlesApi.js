import { path } from "ramda";
import { useQuery } from "react-query";

import articlesApi from "apis/articles";
import { QUERY_KEYS } from "constants/query";

const { ARTICLES_COUNT } = QUERY_KEYS;

export const useFetchArticlesCount = () =>
  useQuery([ARTICLES_COUNT], articlesApi.fetch, {
    select: path(["data"]),
    refetchOnMount: "always",
  });
