import { useMutation } from "react-query";

import versionsApi from "apis/articles/versions";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { ARTICLES_COUNT, ARTICLE_SEARCH_RESULTS, CATEGORIES, ARTICLE, EUI } =
  QUERY_KEYS;

export const useRestoreVersion = options =>
  useMutation(versionsApi.restore, {
    onSuccess: () => {
      queryClient.invalidateQueries([ARTICLE]);
      queryClient.invalidateQueries([ARTICLES_COUNT]);
      queryClient.invalidateQueries([CATEGORIES]);
      queryClient.invalidateQueries([ARTICLE_SEARCH_RESULTS]);
      queryClient.invalidateQueries([EUI]);
      options.onSuccess();
    },
  });
