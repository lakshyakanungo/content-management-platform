import { useMutation } from "react-query";

import schedulesApi from "apis/articles/schedule";
import { QUERY_KEYS } from "constants/query";
import queryClient from "utils/queryClient";

const { ARTICLE } = QUERY_KEYS;

export const useDeleteSchedule = () =>
  useMutation(schedulesApi.destroy, {
    onSuccess: () => queryClient.invalidateQueries([ARTICLE]),
  });
