import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";

import redirectionsApi from "apis/redirections";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { REDIRECTIONS } = QUERY_KEYS;

export const useFetchRedirections = () =>
  useQuery([REDIRECTIONS], redirectionsApi.fetch, {
    select: prop("data"),
  });

export const useCreateRedirection = options =>
  useMutation(redirectionsApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries([REDIRECTIONS]);
      options?.onSuccess?.();
    },
  });

export const useUpdateRedirection = options =>
  useMutation(redirectionsApi.update, {
    onSuccess: () => {
      queryClient.invalidateQueries([REDIRECTIONS]);
      options?.onSuccess?.();
    },
  });

export const useDeleteRedirection = () =>
  useMutation(redirectionsApi.destroy, {
    onSuccess: () => queryClient.invalidateQueries([REDIRECTIONS]),
  });
