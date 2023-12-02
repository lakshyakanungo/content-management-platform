import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";

import siteApi from "apis/site";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { SITE } = QUERY_KEYS;

export const useFetchSiteSecurity = options =>
  useQuery([SITE], siteApi.fetch, {
    onSuccess: options?.onSuccess,
    select: prop("data"),
    refetchOnMount: "always",
  });

export const useUpdateSecurity = () =>
  useMutation(siteApi.update, {
    onSuccess: () => queryClient.invalidateQueries([SITE]),
  });

export const useUpdatePassword = options =>
  useMutation(siteApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries([SITE]);
      options?.onSuccess?.();
    },
  });
