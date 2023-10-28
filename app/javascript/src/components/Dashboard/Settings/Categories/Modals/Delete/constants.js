import * as yup from "yup";

import i18n from "common/i18n";

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
        .required(i18n.t("dashboard.settings.categories.modal.delete.error")),
    }),
});
