import { prop } from "ramda";
import { useQuery, useMutation } from "react-query";

import analyticsApi from "apis/articles/analytics";
import queryClient from "utils/queryClient";

const onMutation = () => queryClient.invalidateQueries(["generatePdf"]);

export const useFetchArticleAnalytics = ({ currentPageNumber }) =>
  useQuery(
    ["analytics", currentPageNumber],
    async () => await analyticsApi.fetch(currentPageNumber),
    {
      select: prop("data"),
      onError: error => logger.log(error),
    }
  );

export const useGeneratePdf = () =>
  useMutation(["generatePdf"], async () => await analyticsApi.generatePdf(), {
    onSuccess: onMutation,
    onError: error => logger.log(error),
  });
