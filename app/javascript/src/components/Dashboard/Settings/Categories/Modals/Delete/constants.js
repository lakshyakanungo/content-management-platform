import { t } from "i18next";
import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  showSelect: yup.boolean(),
  selectedCategory: yup
    .object()
    .shape({
      name: yup.string().required(),
      id: yup.string().required(),
    })
    .nullable()
    .when("showSelect", {
      is: true,
      then: yup
        .object()
        .shape({
          name: yup.string().required(),
          id: yup.string().required(),
        })
        .nullable()
        .required(t("dashboard.settings.categories.modal.delete.error")),
    }),
});
