import { useMutation } from "react-query";

import articlesApi from "apis/articles";
import { parseData } from "components/Dashboard/Articles/Actions/utils";
import queryClient from "utils/queryClient";

// TODO: refactor these
const handleCreate = async ({
  selectedCategory,
  editor,
  selectedOptionIndex,
}) => {
  const data = parseData({
    editor,
    selectedCategory,
    selectedOptionIndex,
  });

  await articlesApi.create({ payload: data });
};

const onMutation = () => queryClient.invalidateQueries(["article.create"]);

export const useCreateArticle = ({ history }) =>
  useMutation(handleCreate, {
    onSuccess: () => {
      onMutation();
      history.push("/articles");
    },
    onError: error => logger.log(error),
  });
