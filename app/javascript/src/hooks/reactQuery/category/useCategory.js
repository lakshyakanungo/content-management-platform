import { path } from "ramda";
import { useMutation, useQuery } from "react-query";

import categoriesApi from "apis/categories";
import queryClient from "utils/queryClient";

const onMutation = () =>
  queryClient.invalidateQueries(["dashboard.categories"]);

const handleAddCategory = async ({ name }) => {
  await categoriesApi.create({ name });
};

export const fetchCategories = async () => await categoriesApi.fetch();

export const useFetchCategories = () =>
  useQuery(["dashboard.categories"], fetchCategories, {
    select: path(["data", "categories"]),
    onError: error => logger.log(error),
    refetchOnMount: "always",
  });

export const useAddCategory = ({ setShowAddCategoryModal }) =>
  useMutation(handleAddCategory, {
    onSuccess: onMutation,
    onError: error => logger.log(error),
    onSettled: () => setShowAddCategoryModal(false),
  });
