import { useMutation } from "react-query";

import authApi from "apis/auth";

export const useAuth = options =>
  useMutation(authApi.authenticate, {
    onSuccess: options?.onSuccess,
  });
