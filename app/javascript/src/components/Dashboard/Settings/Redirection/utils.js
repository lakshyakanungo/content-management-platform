import { t } from "i18next";
import { getSubdomain } from "tldts";
import * as yup from "yup";

import { APP_BASE_URL } from "./constants";

const hasSubdomain = str => {
  const subdomain = getSubdomain(str);

  return !!subdomain;
};

const getFromPaths = redirections =>
  redirections.map(redirection => redirection.from);

const getToPaths = redirections =>
  redirections.map(redirection => redirection.to);

const isFromPathPresentInToPathUrls = (value, redirections) => {
  const fromPathWithPrefix = formatFromUrl(value);

  return getToPaths(redirections).includes(fromPathWithPrefix);
};

const isToPathPresentInFromPathUrls = (toPath, redirections) =>
  getFromPaths(redirections)
    .map(path => `${APP_BASE_URL}${path}`)
    .includes(toPath);

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

export const buildFormInitialValues = ({ isEdit, data }) => ({
  fromUrl: isEdit ? data.from : "",
  toUrl: isEdit ? data.to : "",
});

export const buildFormValidationSchema = redirections =>
  yup.object().shape({
    fromUrl: yup
      .string()
      .required(t("dashboard.settings.redirections.form.validations.required"))
      .matches(
        /^\/[/.a-zA-Z0-9-]+$/,
        t("dashboard.settings.redirections.form.validations.validFromUrl")
      )
      .notOneOf(
        getFromPaths(redirections),
        t("dashboard.settings.redirections.form.validations.duplicateFromUrl")
      )
      .test(
        "is-from-url-causing-cyclic-redirection",
        t("dashboard.settings.redirections.form.validations.cyclicRedirection"),
        value => !isFromPathPresentInToPathUrls(value, redirections)
      ),
    toUrl: yup
      .string()
      .required(t("dashboard.settings.redirections.form.validations.required"))
      .transform(formatToUrl)
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        t("dashboard.settings.redirections.form.validations.validToUrl")
      )
      .test(
        "is-to-url-causing-cyclic-redirection",
        t("dashboard.settings.redirections.form.validations.cyclicRedirection"),
        value => !isToPathPresentInFromPathUrls(value, redirections)
      ),
  });
