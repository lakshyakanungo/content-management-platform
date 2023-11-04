import { getSubdomain } from "tldts";
import * as yup from "yup";

import { APP_BASE_URL } from "./constants";

const hasSubdomain = str => {
  const subdomain = getSubdomain(str);

  return !!subdomain;
};

const getFromPaths = redirections =>
  redirections.map(redirection => redirection.from);

// const getToPaths = redirections =>
//   redirections.map(redirection => redirection.to);

// const isFromPathPresentInToPathUrls = (value, redirections) => {
//   const fromPathWithPrefix = formatFromUrl(value);

//   return getToPaths(redirections).includes(fromPathWithPrefix);
// };

// const isToPathPresentInFromPathUrls = (toPath, redirections) =>
//   getFromPaths(redirections)
//     .map(path => `${APP_BASE_URL}${path}`)
//     .includes(toPath);

// const formatFromUrl = url => {
//   if (url.startsWith(`${APP_BASE_URL}/`)) {
//     return url;
//   } else if (url.startsWith("/")) {
//     return `${APP_BASE_URL}${url}`;
//   }

//   return `${APP_BASE_URL}/${url}`;
// };

export const formatToUrl = url => {
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

export const buildFormValidationSchema = ({ redirections, isEdit, data }) =>
  yup.object().shape({
    fromUrl: yup
      .string()
      .required("Required")
      .test(
        "should-start-with-forward-slash",
        "From path url must start with /",
        value => value.startsWith("/")
      )
      .test(
        "should-not-have-two-same-from-path-urls",
        "Duplicate value not allowed in From path URL",
        value => {
          if (isEdit && value === data.from) {
            return true;
          }

          return !getFromPaths(redirections).includes(value);
        }
      )
      .matches(/^\/[/.a-zA-Z0-9-]+$/, "From path URL must be valid"),
    // .test(
    //   "is-from-url-causing-cyclic-redirection",
    //   "Cyclic redirections not allowed",
    //   value => !isFromPathPresentInToPathUrls(value, redirections)
    // )
    toUrl: yup
      .string()
      .required("Required")
      .test(
        "to-path-url-and-from-path-url-should-be-different",
        "From path url and To path url should be different",
        (_, context) => context.originalValue !== context.parent.fromUrl
      )
      .transform(formatToUrl)
      .matches(/^(?:(https?:\/\/)?\S+|\/\S+)$/, "To path URL must be valid"),
    // .test(
    //   "is-to-url-causing-cyclic-redirection",
    //   "Cyclic redirections not allowed",
    //   value => !isToPathPresentInFromPathUrls(value, redirections)
    // ),
  });
