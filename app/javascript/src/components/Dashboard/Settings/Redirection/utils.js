import { getSubdomain } from "tldts";
import * as yup from "yup";

import { APP_BASE_URL } from "./constants";

const hasSubdomain = str => {
  const subdomain = getSubdomain(str);

  return !!subdomain;
};

const getFromPaths = redirections => {
  const fromPaths = redirections.map(redirection => redirection.from);

  // console.log(fromPaths);
  return fromPaths;
};

const getToPaths = redirections => {
  const toPaths = redirections.map(redirection => redirection.to);

  // console.log(toPaths);
  return toPaths;
};

const isFromPathPresentInToPathUrls = (value, redirections) => {
  const fromPathWithPrefix = formatFromUrl(value);

  return getToPaths(redirections).includes(fromPathWithPrefix);
};

const isToPathPresentInFromPathUrls = (value, redirections) =>
  getFromPaths(redirections)
    .map(fromPath => `${APP_BASE_URL}${fromPath}`)
    .includes(value);

export const formatToUrl = url => {
  // console.log(url);
  if (hasSubdomain(url)) return url;

  if (url.startsWith("/")) {
    return `${APP_BASE_URL}${url}`;
  }

  return `${APP_BASE_URL}/${url}`;
};

export const buildFormInitialValues = ({ isEdit, data }) => ({
  fromUrl: isEdit ? data.from : "",
  toUrl: isEdit ? data.to : "",
});

// export const FORM_VALIDATION_SCHEMA =
export const buildFormValidationSchema = redirections =>
  yup.object().shape({
    fromUrl: yup
      .string()
      .required("Required")
      .matches(/^\/[/.a-zA-Z0-9-]+$/, "From path URL must be valid")
      .notOneOf(
        getFromPaths(redirections),
        "Duplicate value not allowed in From path URL"
      )
      .test(
        "is-from-url-causing-cyclic-redirection",
        "Cyclic redirections not allowed",
        value => !isFromPathPresentInToPathUrls(value, redirections)
      ),
    toUrl: yup
      .string()
      .required("Required")
      .transform(formatToUrl)
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "To path URL must be valid"
      )
      .test(
        "is-to-url-causing-cyclic-redirection",
        "Cyclic redirections not allowed",
        value => !isToPathPresentInFromPathUrls(value, redirections)
      ),

    // .url("To path URL must be valid"),
  });

//See if this is getting used anywhere
export const formatFromUrl = url => {
  if (url.startsWith(`${APP_BASE_URL}/`)) {
    return url;
  } else if (url.startsWith("/")) {
    return `${APP_BASE_URL}${url}`;
  }

  return `${APP_BASE_URL}/${url}`;
};

// TODO: See if writing if conditions better or ternary better here in react best practices
