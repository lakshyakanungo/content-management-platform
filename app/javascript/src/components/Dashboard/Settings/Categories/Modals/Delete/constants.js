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
        .required("Category to move articles into is required"),
    }),
});
