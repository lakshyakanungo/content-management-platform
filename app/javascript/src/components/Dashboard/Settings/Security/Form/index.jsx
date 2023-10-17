import React, { useState, useRef } from "react";

import { Check, Close, Eye } from "neetoicons";
import { Form as NeetoForm, Input, Button } from "neetoui/formik";

import siteSettingsApi from "apis/siteSettings";

import { INITIAL_VALUES } from "./constants";
import {
  buildValidationClassName,
  handleEyeToggle,
  validateForm,
} from "./utils";

const Form = ({ fetchSiteSettings }) => {
  const [hasMinError, setHasMinError] = useState(true);
  const [hasMatchError, setHasMatchError] = useState(true);

  const inputRef = useRef(null);

  // console.log("hasMinError : ", hasMinError);
  // console.log("hasMatchError : ", hasMatchError);

  const handleSubmit = async ({ password }) => {
    try {
      await siteSettingsApi.update({ password });
      fetchSiteSettings();
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <NeetoForm
      formikProps={{
        initialValues: INITIAL_VALUES,
        validate: values =>
          validateForm({ values, setHasMinError, setHasMatchError }),
        onSubmit: handleSubmit,
      }}
    >
      <Input
        className="mb-4"
        label="Password"
        name="password"
        placeholder="Enter password"
        ref={inputRef}
        suffix={<Eye onClick={() => handleEyeToggle(inputRef)} />}
        type="password"
      />
      <div className={buildValidationClassName(hasMinError)}>
        <span>{hasMinError ? <Close size={16} /> : <Check size={16} />}</span>
        <span>Have at least 6 characters</span>
      </div>
      <div className={buildValidationClassName(hasMatchError)}>
        <span>{hasMatchError ? <Close size={16} /> : <Check size={16} />}</span>
        <span>Include at least 1 letter and 1 number</span>
      </div>
      <Button
        className="mr-2"
        disabled={hasMinError || hasMatchError}
        label="Save changes"
        type="submit"
      />
      <Button
        disabled={hasMinError || hasMatchError}
        label="Cancel"
        style="text"
        type="reset"
      />
    </NeetoForm>
  );
};

export default Form;
