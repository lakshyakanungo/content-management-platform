import { path } from "ramda";
import { useMutation, useQuery } from "react-query";

import categoriesApi from "apis/categories";
import queryClient from "utils/queryClient";

const fetchCategories = async () => await categoriesApi.fetch();

const onMutation = () => queryClient.invalidateQueries(["categories"]);

const handleAddCategory = async ({ name }) => {
  await categoriesApi.create({ name });
};

const handleReorder = async ({ category, finalPosition }) => {
  await categoriesApi.update({
    id: category.id,
    payload: { position: finalPosition },
  });
};

const handleEdit = async ({ name, category }) => {
  await categoriesApi.update({
    id: category.id,
    payload: { name },
  });
};

const handleDelete = async ({ category, selectedCategory }) => {
  await categoriesApi.destroy({
    id: category.id,
    payload: {
      id: category.id,
      move_into_category_id: selectedCategory?.id,
    },
  });
};

export const useFetchCategories = ({ setCategories }) =>
  useQuery(["categories"], fetchCategories, {
    select: path(["data", "categories"]),
    onError: error => logger.log(error),
    onSuccess: data => {
      setCategories(data);
    },
    refetchOnMount: "always",
  });

export const useAddCategory = ({ setShowAddCategoryModal }) =>
  useMutation(handleAddCategory, {
    onSuccess: onMutation,
    onError: error => logger.log(error),
    onSettled: () => setShowAddCategoryModal(false),
  });

export const useReorderCategory = () =>
  useMutation(handleReorder, {
    onSuccess: onMutation,
    onError: error => logger.log(error),
  });

export const useEditCategory = ({ setShowEditModal }) =>
  useMutation(handleEdit, {
    onSuccess: () => {
      onMutation();
      setShowEditModal(false);
    },
    onError: error => logger.log(error),
  });

export const useDeleteCategory = ({ setShowDeleteOverlay }) =>
  useMutation(handleDelete, {
    onSuccess: () => {
      onMutation();
      setShowDeleteOverlay(false);
    },
    onError: error => logger.log(error),
  });
