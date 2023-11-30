import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";

import { resetAuthTokens } from "apis/axios";
import siteApi from "apis/site";
import queryClient from "utils/queryClient";
import { setToLocalStorage } from "utils/storage";

const fetchSiteSecurity = async () => await siteApi.fetch();

const onMutation = () => queryClient.invalidateQueries(["security"]);

const updateSiteSecurity = async () => {
  await siteApi.update({ is_password_protected: false });
};

const updatePassword = async ({ password }) =>
  await siteApi.update({ password, is_password_protected: true });

export const useFetchSiteSecurity = ({
  setIsPasswordRequired,
  setShowChangePasswordForm,
}) =>
  useQuery(["security"], fetchSiteSecurity, {
    onSuccess: data => {
      setIsPasswordRequired(data.isPasswordProtected);
      setShowChangePasswordForm(data.isPasswordProtected);
    },
    onError: error => logger.log(error),
    select: prop("data"),
    refetchOnMount: "always",
  });

export const useUpdateSiteSecurity = () =>
  useMutation(updateSiteSecurity, {
    onSuccess: onMutation,
    onError: error => logger.log(error),
  });

export const useUpdatePassword = () =>
  useMutation(updatePassword, {
    onSuccess: () => {
      onMutation();
      resetAuthTokens();
      setToLocalStorage("authToken", null);
    },
    onError: error => logger.log(error),
  });
