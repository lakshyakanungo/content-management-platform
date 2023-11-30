import { useMutation } from "react-query";

import articlesApi from "apis/articles";
import queryClient from "utils/queryClient";

const handleDelete = async article =>
  await articlesApi.deleteScheduledJob(article.id);

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
