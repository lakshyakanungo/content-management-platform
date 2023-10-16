import { getSubdomain } from "tldts";
import * as yup from "yup";

import { APP_BASE_URL } from "./constants";

const hasSubdomain = str => {
  const subdomain = getSubdomain(str);

  return !!subdomain;
};

export const buildFormInitialValues = ({ isEdit, data }) => ({
  fromUrl: isEdit ? data.from : "",
  toUrl: isEdit ? data.to : "",
});

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  fromUrl: yup.string().required("From path URL must be valid"),
  toUrl: yup.string().required("To path URL must be valid"),
});

export const formatFromUrl = url => {
  if (url.startsWith(`${APP_BASE_URL}/`)) {
    return url;
  } else if (url.startsWith("/")) {
    return `${APP_BASE_URL}${url}`;
  }

  return `${APP_BASE_URL}/${url}`;
};

export const formatToUrl = url => {
  if (hasSubdomain(url)) return url;

  if (url.startsWith("/")) {
    return `${APP_BASE_URL}${url}`;
  }

  return `${APP_BASE_URL}/${url}`;
};
// TODO: See if writing if conditions better or ternary better here in react best practices
