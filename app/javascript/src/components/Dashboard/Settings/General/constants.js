import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  siteName: yup
    .string()
    .required("Required")
    .max(40, "Max title length is 40 characters")
    .matches(
      /^.*[a-zA-Z0-9].*$/i,
      "Atleast one alphanumeric character must be present"
    ),
});
