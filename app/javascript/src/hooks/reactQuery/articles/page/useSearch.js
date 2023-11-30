import { path } from "ramda";
import { useQuery } from "react-query";

import articlesApi from "apis/articles";

// TODO: See of this file is needed.? Is it necessary to use react query for all api call?

// const { data, isFetching, refetch } = useFetchSearchResults({
//   searchTerm,
//   activeMenuState,
//   selectedCategories,
//   currentPageNumber,
// });

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
