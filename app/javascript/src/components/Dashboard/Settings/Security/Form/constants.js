import * as yup from "yup";

export const INITIAL_VALUES = {
  password: "",
};

export const YUP_VALIDATION_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/),
});
