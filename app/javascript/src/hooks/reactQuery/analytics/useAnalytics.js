import { prop } from "ramda";
import { useQuery, useMutation } from "react-query";

import articlesApi from "apis/articles";
import queryClient from "utils/queryClient";

const onMutation = () => queryClient.invalidateQueries(["generatePdf"]);

export const useFetchArticleAnalytics = ({ currentPageNumber }) =>
  useQuery(
    ["analytics", currentPageNumber],
    async () => await articlesApi.analytics(currentPageNumber),
    {
      select: prop("data"),
      onError: error => logger.log(error),
    }
  );

export const useGeneratePdf = () =>
  useMutation(["generatePdf"], async () => await articlesApi.generatePdf(), {
    onSuccess: onMutation,
    onError: error => logger.log(error),
  });
