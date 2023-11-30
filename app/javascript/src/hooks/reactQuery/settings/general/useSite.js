import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";

import siteApi from "apis/site";
import queryClient from "utils/queryClient";

const fetchSite = async () => await siteApi.fetch();

const onMutation = () => queryClient.invalidateQueries(["site"]);

const updateSite = async ({ siteName }) =>
  await siteApi.update({ title: siteName });

export const useFetchSite = () =>
  useQuery(["site"], fetchSite, {
    select: prop("data"),
    onError: error => logger.log(error),
  });

export const useUpdateSite = () =>
  useMutation(updateSite, {
    onSuccess: onMutation,
    onError: error => logger.log(error),
  });
