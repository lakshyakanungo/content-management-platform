import React from "react";

import { truncate } from "@bigbinary/neeto-commons-frontend/pure";
import { t } from "i18next";
import * as yup from "yup";

import {
  HOST_NAME,
  URL_TRUNCATE_LENGTH,
  VALID_FROM_PATH_REGEX,
  VALID_TO_FULL_URL_REGEX,
  VALID_TO_PATH_URL_REGEX,
} from "./constants";

const getFromPaths = redirections =>
  redirections.map(redirection => redirection.from);

const checkValidToPath = path => {
  if (!path) return true;

  if (path.startsWith("/")) return VALID_TO_PATH_URL_REGEX.test(path);

  return VALID_TO_FULL_URL_REGEX.test(path);
};

const checkDuplicateValuesInFromPaths = ({
  value,
  data,
  isEdit,
  redirections,
}) => {
  if (isEdit && value === data.from) {
    return true;
  }

  return !getFromPaths(redirections).includes(value);
};

export const buildFormInitialValues = ({ isEdit, data }) => ({
  fromUrl: isEdit ? data.from : "",
  toUrl: isEdit ? data.to : "",
});

export const buildFormValidationSchema = ({ redirections, isEdit, data }) =>
  yup.object().shape({
    fromUrl: yup
      .string()
      .required(
        t("dashboard.settings.redirections.form.validations.from.required")
      )
      .test(
        "should-start-with-forward-slash",
        t("dashboard.settings.redirections.form.validations.from.start"),
        value => value && value.startsWith("/")
      )
      .test(
        "should-not-have-two-same-from-path-urls",
        t("dashboard.settings.redirections.form.validations.from.duplicate"),
        value =>
          checkDuplicateValuesInFromPaths({ value, data, isEdit, redirections })
      )
      .matches(
        VALID_FROM_PATH_REGEX,
        t("dashboard.settings.redirections.form.validations.from.valid")
      ),
    toUrl: yup
      .string()
      .required(
        t("dashboard.settings.redirections.form.validations.to.required")
      )
      .test(
        "valid-to-path-url",
        t("dashboard.settings.redirections.form.validations.to.valid"),
        value => checkValidToPath(value)
      ),
  });

export const buildFullUrl = url => {
  if (url.startsWith("/")) return `${HOST_NAME}${url}`;

  return url;
};

export const FormattedUrl = ({ url }) => {
  if (url.startsWith("/")) {
    return (
      <div>
        <span className="text-gray-500 mx-0">{HOST_NAME}</span>
        {truncate(url, URL_TRUNCATE_LENGTH - HOST_NAME.length)}
      </div>
    );
  }

  return truncate(url, URL_TRUNCATE_LENGTH);
};
