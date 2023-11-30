import { useMutation } from "react-query";

import articlesApi from "apis/articles";
import queryClient from "utils/queryClient";

const onMutation = () =>
  queryClient.invalidateQueries([
    "dashboard.articles.count",
    "dashboard.categories",
  ]);

const handleStatusChange = async ({ id, status }) => {
  await articlesApi.update({
    id,
    payload: { status },
  });
};

const handleDelete = async id => await articlesApi.destroy(id);

export const useHandleStatusChange = ({ refetch }) =>
  useMutation(handleStatusChange, {
    onSuccess: () => {
      onMutation();
      refetch();
    },
    onError: error => logger.log(error),
  });

export const useHandleDelete = ({ refetch }) =>
  useMutation(handleDelete, {
    onSuccess: () => {
      onMutation();
      refetch();
    },
    onError: error => logger.log(error),
  });
