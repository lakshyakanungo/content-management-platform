import { t } from "i18next";
import * as yup from "yup";

export const CREATE_CATEGORY_FORM_INITIAL_VALUE = { name: "" };

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required(t("dashboard.settings.categories.modal.create.error")),
});
