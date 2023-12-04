import { path } from "ramda";
import { useQuery } from "react-query";

import articlesApi from "apis/articles";
import { QUERY_KEYS } from "constants/query";

const { ARTICLE_SEARCH_RESULTS } = QUERY_KEYS;

export const useFetchSearchResults = ({
  searchTerm,
  selectedCategoriesIds,
  activeMenuState,
  currentPageNumber,
}) =>
  useQuery(
    [
      ARTICLE_SEARCH_RESULTS,
      searchTerm,
      selectedCategoriesIds,
      activeMenuState,
      currentPageNumber,
    ],
    () =>
      articlesApi.search({
        searchTerm,
        selectedCategoriesIds,
        activeMenuState,
        currentPageNumber,
      }),
    {
      select: path(["data"]),
      refetchOnWindowFocus: "always",
      staleTime: 10000,
      keepPreviousData: true,
    }
  );
