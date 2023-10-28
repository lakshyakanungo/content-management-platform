import * as yup from "yup";

import i18n from "common/i18n";

export const VALIDATION_SCHEMA = yup.object().shape({
  siteName: yup
    .string()
    .required(i18n.t("dashboard.settings.general.form.validations.required"))
    .max(40, i18n.t("dashboard.settings.general.form.validations.max"))
    .matches(
      /^.*[a-zA-Z0-9].*$/i,
      i18n.t("dashboard.settings.general.form.validations.patternMatch")
    ),
});
