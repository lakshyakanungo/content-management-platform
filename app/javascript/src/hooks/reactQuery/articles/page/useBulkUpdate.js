import { useMutation } from "react-query";

import articlesApi from "apis/articles";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { ARTICLES_COUNT, CATEGORIES, ARTICLE_SEARCH_RESULTS } = QUERY_KEYS;

export const useBulkStatusChange = options =>
  useMutation(articlesApi.bulkUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries([ARTICLES_COUNT]);
      queryClient.invalidateQueries([ARTICLE_SEARCH_RESULTS]);
      options.onSuccess();
    },
  });

export const useBulkCategoryChange = options =>
  useMutation(articlesApi.bulkUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries([ARTICLES_COUNT]);
      queryClient.invalidateQueries([CATEGORIES]);
      queryClient.invalidateQueries([ARTICLE_SEARCH_RESULTS]);
      options.onSuccess();
    },
  });

export const useBulkDelete = options =>
  useMutation(articlesApi.bulkDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries([ARTICLES_COUNT]);
      queryClient.invalidateQueries([CATEGORIES]);
      queryClient.invalidateQueries([ARTICLE_SEARCH_RESULTS]);
      options.onSuccess();
    },
  });
