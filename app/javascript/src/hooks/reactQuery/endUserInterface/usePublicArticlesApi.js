import { prop } from "ramda";
import { useQuery } from "react-query";

import articlesApi from "apis/public/articles";
import { QUERY_KEYS } from "constants/query";

const { EUI, EUI_ARTICLE, EUI_SEARCH } = QUERY_KEYS;

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
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
    keepPreviousData: true,
    staleTime: 10000,
  });

export const useSearch = (searchTerm, options) =>
  useQuery([EUI_SEARCH, searchTerm], () => articlesApi.search(searchTerm), {
    select: prop("data"),
    onSuccess: options?.onSuccess,
    enabled: searchTerm !== "",
  });
