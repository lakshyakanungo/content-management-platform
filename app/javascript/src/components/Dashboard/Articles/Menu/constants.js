import * as yup from "yup";

import i18n from "common/i18n";

export const MENU_ARTICLE_STATES = ["All", "Draft", "Published"];

export const ADD_CATEGORY_FORM_INITIAL_VALUE = { name: "" };

export const ADD_CATEGORY_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t("dashboard.articles.menu.addCategory.errorMsg")),
});
