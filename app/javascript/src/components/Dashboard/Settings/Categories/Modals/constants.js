import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  category: yup.string().required("Category title is required"),
});
