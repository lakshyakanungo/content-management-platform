import { path } from "ramda";
import { useQuery } from "react-query";

import categoriesApi from "apis/categories";
import { QUERY_KEYS } from "constants/query";

const { CATEGORY_SEARCH } = QUERY_KEYS;

export const useCategorySearch = ({ searchTerm, isSearchCollapsed }) =>
  useQuery(
    [CATEGORY_SEARCH, searchTerm, isSearchCollapsed],
    () => categoriesApi.search({ name: searchTerm }),
    {
      select: path(["data"]),
      refetchOnMount: "always",
      enabled: !isSearchCollapsed,
    }
  );
