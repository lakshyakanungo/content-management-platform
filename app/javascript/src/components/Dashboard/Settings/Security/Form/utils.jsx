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

export const validateForm = ({ values, setIsMinError, setIsMatchError }) => {
  try {
    YUP_VALIDATION_SCHEMA.validateSync(values, {
      abortEarly: false,
    });
    setIsMinError(false);
    setIsMatchError(false);
  } catch (err) {
    const errorTypes = err.inner.map(error => error.type);

    if (errorTypes.includes("min")) setIsMinError(true);
    else setIsMinError(false);

    if (errorTypes.includes("matches")) setIsMatchError(true);
    else setIsMatchError(false);
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

export const renderEyeToggle = ({ isPasswordVisible, handleToggle }) => (
  <span>
    {isPasswordVisible ? (
      <EyeOpen onClick={handleToggle} />
    ) : (
      <EyeClosed onClick={handleToggle} />
    )}
  </span>
);
