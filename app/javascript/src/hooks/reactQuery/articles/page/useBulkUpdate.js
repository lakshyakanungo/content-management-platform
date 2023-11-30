import { useMutation } from "react-query";

import articlesApi from "apis/articles";
import queryClient from "utils/queryClient";

const onMutation = () =>
  queryClient.invalidateQueries([
    "dashboard.articles.count",
    "dashboard.categories",
  ]);

const handleBulkStatusChange = async ({ status, selectedArticleIds }) => {
  await articlesApi.bulkUpdate({
    ids: selectedArticleIds,
    payload: { status },
  });
};

const handleBulkCategoryChange = async ({ categoryId, selectedArticleIds }) => {
  await articlesApi.bulkUpdate({
    ids: selectedArticleIds,
    payload: { category_id: categoryId },
  });
};

const handleBulkDelete = async ids => {
  await articlesApi.bulkDelete(ids);
};

export const useBulkStatusChange = ({ refetch, setSelectedArticleIds }) =>
  useMutation(handleBulkStatusChange, {
    onSuccess: () => {
      onMutation();
      refetch();
      setSelectedArticleIds([]);
    },
    onError: error => logger.log(error),
  });

export const useBulkCategoryChange = ({ refetch, setSelectedArticleIds }) =>
  useMutation(handleBulkCategoryChange, {
    onSuccess: () => {
      onMutation();
      refetch();
      setSelectedArticleIds([]);
    },
    onError: error => logger.log(error),
  });

export const useBulkDelete = ({ refetch, setSelectedArticleIds }) =>
  useMutation(handleBulkDelete, {
    onSuccess: () => {
      onMutation();
      refetch();
      setSelectedArticleIds([]);
    },
    onError: error => logger.log(error),
  });
