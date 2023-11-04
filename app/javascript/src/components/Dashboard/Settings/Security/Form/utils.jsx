import React from "react";

import classNames from "classnames";
import {
  AiOutlineEye as EyeOpen,
  AiOutlineEyeInvisible as EyeClosed,
} from "react-icons/ai";

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

export const handleToggle = ({ inputRef, setIsPasswordVisible }) => {
  setIsPasswordVisible(prev => !prev);

  if (inputRef.current.type === "password") {
    inputRef.current.type = "text";
  } else {
    inputRef.current.type = "password";
  }
};

export const TogglePassword = ({ isPasswordVisible, onClick }) => (
  <span>
    {isPasswordVisible ? (
      <EyeOpen onClick={onClick} />
    ) : (
      <EyeClosed onClick={onClick} />
    )}
  </span>
);
