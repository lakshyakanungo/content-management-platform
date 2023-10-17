import * as yup from "yup";

export const INITIAL_VALUES = {
  password: "",
};

export const YUP_VALIDATION_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .min(6, "Have at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Include at least 1 letter and 1 number"
    ),
});
