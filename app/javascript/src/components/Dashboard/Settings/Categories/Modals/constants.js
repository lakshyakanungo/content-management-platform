import * as yup from "yup";

export const CREATE_CATEGORY_FORM_INITIAL_VALUE = { name: "" };

export const FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Category title is required"),
});
