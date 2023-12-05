import { prop } from "ramda";
import { useQuery } from "react-query";
import { isPresent } from "utils";

import articlesApi from "apis/public/articles";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { EUI, EUI_ARTICLE, EUI_SEARCH, ARTICLE_ANALYTICS } = QUERY_KEYS;

export const useFetchArticlesByCategory = options =>
  useQuery([EUI], articlesApi.fetch, {
    select: prop("data"),
    onSuccess: options?.onSuccess,
    staleTime: 10000,
  });

export const useFetchArticle = (slug, options) =>
  useQuery([EUI_ARTICLE, slug], () => articlesApi.show(slug), {
    select: prop("data"),
    onSuccess: data => {
      queryClient.invalidateQueries([ARTICLE_ANALYTICS]),
        options?.onSuccess?.(data);
    },
    onError: options?.onError,
    keepPreviousData: true,
    staleTime: 10000,
  });

export const useSearch = searchTerm =>
  useQuery([EUI_SEARCH, searchTerm], () => articlesApi.search(searchTerm), {
    select: prop("data"),
    enabled: isPresent(searchTerm),
    keepPreviousData: true,
  });
