import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";

import siteApi from "apis/site";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { SITE } = QUERY_KEYS;

export const useFetchSite = () =>
  useQuery([SITE], siteApi.fetch, {
    select: prop("data"),
  });

export const useUpdateSite = () =>
  useMutation(siteApi.update, {
    onSuccess: () => queryClient.invalidateQueries([SITE]),
  });
