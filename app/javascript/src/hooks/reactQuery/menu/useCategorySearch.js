import { path } from "ramda";
import { useQuery } from "react-query";

import categoriesApi from "apis/categories";

const fetchSearchResults = async ({ searchTerm }) =>
  await categoriesApi.search({ name: searchTerm });

export const useCategorySearch = ({ searchTerm }) =>
  useQuery(["categories.search"], () => fetchSearchResults({ searchTerm }), {
    select: path(["data", "categories"]),
    onError: error => logger.log(error),
    refetchOnMount: "always",
  });
