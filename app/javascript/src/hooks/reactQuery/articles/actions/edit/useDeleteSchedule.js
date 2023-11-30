import { useMutation } from "react-query";

import schedulesApi from "apis/articles/schedule";
import queryClient from "utils/queryClient";

const handleDelete = async article => await schedulesApi.destroy(article.id);

const onMutation = () =>
  queryClient.invalidateQueries(["dashboard.article", "dashboard.categories"]);

export const useDeleteSchedule = ({ article, refetch }) =>
  useMutation(() => handleDelete(article), {
    onSuccess: () => {
      onMutation();
      refetch();
    },
    onError: error => logger.log(error),
  });
