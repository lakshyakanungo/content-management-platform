import { useMutation } from "react-query";

import articlesApi from "apis/articles";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { ARTICLES_COUNT, ARTICLE_SEARCH_RESULTS, CATEGORIES, EUI } = QUERY_KEYS;

export const useHandleStatusChange = () =>
  useMutation(articlesApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries([ARTICLES_COUNT]);
      queryClient.invalidateQueries([ARTICLE_SEARCH_RESULTS]);
      queryClient.invalidateQueries([EUI]);
    },
  });

export const useHandleDelete = () =>
  useMutation(articlesApi.destroy, {
    onSuccess: () => {
      queryClient.invalidateQueries([ARTICLES_COUNT]);
      queryClient.invalidateQueries([CATEGORIES]);
      queryClient.invalidateQueries([ARTICLE_SEARCH_RESULTS]);
      queryClient.invalidateQueries([EUI]);
    },
  });
