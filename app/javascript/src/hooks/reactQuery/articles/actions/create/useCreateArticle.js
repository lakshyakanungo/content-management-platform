import { useMutation } from "react-query";

import articlesApi from "apis/articles";
import { parseData } from "components/Dashboard/Articles/Actions/utils";
import queryClient from "utils/queryClient";

const handleCreate = async ({
  selectedCategory,
  editor,
  selectedOptionIndex,
}) => {
  try {
    const data = parseData({
      editor,
      selectedCategory,
      selectedOptionIndex,
    });

    await articlesApi.create({ payload: data });
  } catch (error) {
    logger.log(error);
  }
};

const onMutation = () => queryClient.invalidateQueries(["article.create"]);

// const updateSite = async ({ siteName }) =>
//   await siteApi.update({ title: siteName });

// export const useFetchSite = () =>
//   useQuery(["article.create"], fetchSite, {
//     select: prop("data"),
//     onError: error => logger.log(error),
//   });

export const useCreateArticle = ({ history }) =>
  useMutation(handleCreate, {
    onSuccess: () => {
      onMutation(), history.push("/articles");
    },
    onError: error => logger.log(error),
  });
