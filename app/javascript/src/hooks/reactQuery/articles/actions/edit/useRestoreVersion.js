import { useMutation } from "react-query";

import articlesApi from "apis/articles";
import queryClient from "utils/queryClient";

const onMutation = () =>
  queryClient.invalidateQueries(["dashboard.article", "dashboard.categories"]);

const handleRestore = async ({ article, version }) =>
  await articlesApi.restore({ id: article.id, versionId: version.id });

export const useRestoreVersion = ({ refetch, setShowVersionHistory }) =>
  useMutation(handleRestore, {
    onSuccess: () => {
      onMutation();
      setShowVersionHistory(false);
      refetch();
    },
    onError: error => logger.log(error),
  });
