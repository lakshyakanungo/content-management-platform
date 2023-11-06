import { getDomain } from "tldts";
import * as yup from "yup";

const hasDomain = str => {
  const domain = getDomain(str);

  return !!domain;
};

const getFromPaths = redirections =>
  redirections.map(redirection => redirection.from);

const checkValidToPath = path => {
  if (path.startsWith("/")) return true;

  return hasDomain(path);
};

const checkDuplicateValuesInFromPaths = ({
  value,
  data,
  isEdit,
  redirections,
}) => {
  if (isEdit && value === data.from) {
    return true;
  }

  return !getFromPaths(redirections).includes(value);
};

export const buildFormInitialValues = ({ isEdit, data }) => ({
  fromUrl: isEdit ? data.from : "",
  toUrl: isEdit ? data.to : "",
});

export const buildFormValidationSchema = ({ redirections, isEdit, data }) =>
  yup.object().shape({
    fromUrl: yup
      .string()
      .required("Required")
      .test(
        "should-start-with-forward-slash",
        "From path url must start with /",
        value => value.startsWith("/")
      )
      .test(
        "should-not-have-two-same-from-path-urls",
        "Duplicate value not allowed in From path URL",
        value =>
          checkDuplicateValuesInFromPaths({ value, data, isEdit, redirections })
      )
      .matches(/^\/[/.a-zA-Z0-9-]+$/, "From path URL must be valid"),
    toUrl: yup
      .string()
      .required("Required")
      .test(
        "to-path-url-and-from-path-url-should-be-different",
        "From path url and To path url should be different",
        (_, context) => context.originalValue !== context.parent.fromUrl
      )
      .test("valid-to-path-url", "To path url must be valid", value =>
        checkValidToPath(value)
      ),
  });
