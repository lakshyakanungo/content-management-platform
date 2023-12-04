import { useMutation } from "react-query";

import authApi from "apis/auth";
import queryClient from "utils/queryClient";
import { setToLocalStorage } from "utils/storage";

const onMutation = () => queryClient.invalidateQueries(["auth"]);

const handleAuthentication = async ({ password }) =>
  await authApi.authenticate({ password });

export const useAuth = () =>
  useMutation(handleAuthentication, {
    onSuccess: ({ data }) => {
      onMutation();
      setToLocalStorage("authToken", data.authenticationToken);
      window.location.href = "/eui";
    },
    onError: error => logger.log(error),
  });
