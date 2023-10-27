import { t } from "i18next";
import * as yup from "yup";

export const MENU_ARTICLE_STATES = ["All", "Draft", "Published"];

export const ADD_CATEGORY_FORM_INITIAL_VALUE = { name: "" };

export const ADD_CATEGORY_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(t("dashboard.articles.menu.addCategory.error")),
});
