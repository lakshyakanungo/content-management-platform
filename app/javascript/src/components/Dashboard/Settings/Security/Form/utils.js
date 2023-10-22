import classNames from "classnames";

import { YUP_VALIDATION_SCHEMA } from "./constants";

export const buildValidationClassName = validation =>
  classNames({
    "flex gap-2 items-center text-xs my-2": true,
    "neeto-ui-text-gray-500": validation,
    "neeto-ui-text-success-500": !validation,
  });

export const validateForm = ({ values, setHasMinError, setHasMatchError }) => {
  try {
    YUP_VALIDATION_SCHEMA.validateSync(values, {
      abortEarly: false,
    });
    setHasMinError(false);
    setHasMatchError(false);
  } catch (err) {
    const errorTypes = err.inner.map(error => error.type);

    if (errorTypes.includes("min")) setHasMinError(true);
    else setHasMinError(false);

    if (errorTypes.includes("matches")) setHasMatchError(true);
    else setHasMatchError(false);
  }
};

// export
