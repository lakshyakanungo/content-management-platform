import React, { useState, useRef } from "react";

import { Check, Close } from "neetoicons";
import { Form as NeetoForm, Input, Button } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import siteApi from "apis/site";

import { INITIAL_VALUES } from "./constants";
import {
  TogglePassword,
  buildValidationClassName,
  handleToggle,
  validateForm,
} from "./utils";

const Form = ({ fetchSite }) => {
  const [hasMinError, setHasMinError] = useState(true);
  const [hasMatchError, setHasMatchError] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputRef = useRef(null);

  const { t } = useTranslation();

  const handleSubmit = async ({ password }) => {
    try {
      await siteApi.update({ password, is_password_protected: true });
      fetchSite();
    } catch (error) {
      logger.log(error);
    }
  };

  const handleReset = resetForm => {
    resetForm();
    setHasMinError(true);
    setHasMatchError(true);
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
      {({ resetForm }) => (
        <>
          <Input
            className="mb-4"
            label={t("dashboard.settings.security.form.inputLabel")}
            name="password"
            placeholder={t("dashboard.settings.security.form.placeholder")}
            ref={inputRef}
            type="password"
            suffix={
              <TogglePassword
                isPasswordVisible={isPasswordVisible}
                onClick={() => handleToggle({ inputRef, setIsPasswordVisible })}
              />
            }
          />
          <div className={buildValidationClassName(hasMinError)}>
            <span>
              {hasMinError ? <Close size={16} /> : <Check size={16} />}
            </span>
            <span>{t("dashboard.settings.security.form.lengthError")}</span>
          </div>
          <div className={buildValidationClassName(hasMatchError)}>
            <span>
              {hasMatchError ? <Close size={16} /> : <Check size={16} />}
            </span>
            <span>{t("dashboard.settings.security.form.strengthError")}</span>
          </div>
          <Button
            className="mr-2"
            disabled={hasMinError || hasMatchError}
            label={t("dashboard.settings.security.form.button.save")}
            type="submit"
          />
          <Button
            label={t("dashboard.settings.security.form.button.cancel")}
            style="text"
            type="reset"
            onClick={() => handleReset(resetForm)}
          />
        </>
      )}
    </NeetoForm>
  );
};

export default Form;
