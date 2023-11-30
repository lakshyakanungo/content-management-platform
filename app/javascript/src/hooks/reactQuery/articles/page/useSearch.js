import { path } from "ramda";
import { useQuery } from "react-query";

import articlesApi from "apis/articles";

const fetchSearchResults = async ({
  searchTerm,
  activeMenuState,
  currentPageNumber,
  selectedCategories,
}) => {
  const selectedCategoriesIds = selectedCategories.map(category => category.id);
  const query = searchTerm.trim();

  return await articlesApi.search({
    searchTerm: query,
    selectedCategoriesIds,
    activeMenuState,
    currentPageNumber,
  });
};

export const useFetchSearchResults = ({
  searchTerm,
  activeMenuState,
  currentPageNumber,
  selectedCategories,
}) =>
  useQuery(
    [
      "dashboard.articles.search",
      searchTerm,
      activeMenuState,
      currentPageNumber,
      selectedCategories,
    ],
    () =>
      fetchSearchResults({
        searchTerm,
        activeMenuState,
        selectedCategories,
        currentPageNumber,
      }),
    {
      select: path(["data"]),
      onError: error => logger.log(error),
      refetchOnMount: "always",
    }
  );
