import { path } from "ramda";
import { useMutation, useQuery } from "react-query";

import categoriesApi from "apis/categories";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { CATEGORIES } = QUERY_KEYS;

export const useFetchCategories = () =>
  useQuery([CATEGORIES], categoriesApi.fetch, {
    select: path(["data"]),
    refetchOnMount: "always",
  });

export const useAddCategory = options =>
  useMutation(categoriesApi.create, {
    onSuccess: () => queryClient.invalidateQueries([CATEGORIES]),
    onSettled: options?.onSettled,
  });
