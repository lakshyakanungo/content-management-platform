import { prop } from "ramda";
import { useMutation, useQuery } from "react-query";

import redirectionsApi from "apis/redirections";
import queryClient from "utils/queryClient";

const fetchRedirections = async () => await redirectionsApi.fetch();

const onMutation = () => queryClient.invalidateQueries(["redirection"]);

const updateRedirection = async ({
  fromUrl,
  toUrl,
  isEdit,
  handleClose,
  data,
}) => {
  const payload = { from: fromUrl, to: toUrl };

  if (isEdit) {
    await redirectionsApi.update({
      id: data.id,
      payload,
    });
  } else {
    await redirectionsApi.create(payload);
  }
  handleClose();
};

const deleteRedirection = async ({ redirection }) => {
  await redirectionsApi.destroy(redirection.id);
};

export const useFetchRedirections = () =>
  useQuery(["redirection"], fetchRedirections, {
    select: prop("data"),
    onError: error => logger.log(error),
  });

export const useUpdateRedirection = () =>
  useMutation(updateRedirection, {
    onSuccess: onMutation,
    onError: error => logger.log(error),
  });

export const useDeleteRedirection = () =>
  useMutation(deleteRedirection, {
    onSuccess: onMutation,
    onError: error => logger.log(error),
  });
