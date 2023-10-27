import { t } from "i18next";
import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  siteName: yup
    .string()
    .required(t("dashboard.settings.general.form.validations.required"))
    .max(40, t("dashboard.settings.general.form.validations.max"))
    .matches(
      /^.*[a-zA-Z0-9].*$/i,
      t("dashboard.settings.general.form.validations.patternMatch")
    ),
});
