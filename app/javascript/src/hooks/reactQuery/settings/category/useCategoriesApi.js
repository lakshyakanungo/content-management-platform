import { path } from "ramda";
import { useMutation, useQuery } from "react-query";

import categoriesApi from "apis/categories";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { CATEGORIES } = QUERY_KEYS;

export const useFetchCategories = options =>
  useQuery([CATEGORIES], categoriesApi.fetch, {
    onSuccess: options?.onSuccess,
    select: path(["data", "categories"]),
    refetchOnMount: "always",
  });

export const useCreateCategory = options =>
  useMutation(categoriesApi.create, {
    onSuccess: () => queryClient.invalidateQueries([CATEGORIES]),
    onSettled: options?.onSettled,
  });

export const useReorderCategory = () =>
  useMutation(categoriesApi.update, {
    onSuccess: () => queryClient.invalidateQueries([CATEGORIES]),
  });

export const useUpdateCategory = options =>
  useMutation(categoriesApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORIES]);
      options?.onSuccess?.();
    },
  });

export const useDeleteCategory = options =>
  useMutation(categoriesApi.destroy, {
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORIES]);
      options?.onSuccess?.();
    },
  });
