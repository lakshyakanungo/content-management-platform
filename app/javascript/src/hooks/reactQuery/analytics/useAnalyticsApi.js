import { prop } from "ramda";
import { useQuery, useMutation } from "react-query";

import analyticsApi from "apis/articles/analytics";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { ARTICLE_ANALYTICS, GENERATE_PDF, DOWNLOAD_PDF } = QUERY_KEYS;

const onMutation = () => queryClient.invalidateQueries([GENERATE_PDF]);

export const useFetchArticleAnalytics = currentPageNumber =>
  useQuery(
    [ARTICLE_ANALYTICS, currentPageNumber],
    () => analyticsApi.fetch(currentPageNumber),
    {
      select: prop("data"),
    }
  );

export const useGeneratePdf = () =>
  useMutation([GENERATE_PDF], () => analyticsApi.generatePdf(), {
    onSuccess: onMutation,
  });

export const useDownloadPdf = onSuccess =>
  useQuery([DOWNLOAD_PDF], () => analyticsApi.download(), {
    select: prop("data"),
    onSuccess,
    enabled: false,
  });
