import { path } from "ramda";
import { useMutation, useQuery } from "react-query";

import articlesApi from "apis/articles";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const {
  ARTICLE,
  ARTICLES_COUNT,
  ARTICLE_ANALYTICS,
  ARTICLE_SEARCH_RESULTS,
  EUI,
} = QUERY_KEYS;

export const useFetchArticle = id =>
  useQuery([ARTICLE], () => articlesApi.show(id), {
    select: path(["data"]),
    refetchOnMount: "always",
  });

export const useEditArticle = options =>
  useMutation(articlesApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries([ARTICLE]);
      queryClient.invalidateQueries([ARTICLES_COUNT]);
      queryClient.invalidateQueries([ARTICLE_ANALYTICS]);
      queryClient.invalidateQueries([ARTICLE_SEARCH_RESULTS]);
      queryClient.invalidateQueries([EUI]);
      options.onSuccess();
    },
  });
