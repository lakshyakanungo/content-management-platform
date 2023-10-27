import React, { useState, useRef } from "react";

import { Check, Close, Eye } from "neetoicons";
import { Form as NeetoForm, Input, Button } from "neetoui/formik";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const handleSubmit = async ({ password }) => {
    try {
      await siteSettingsApi.update({ password, is_password_protected: true });
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
        label={t("dashboard.settings.security.form.inputLabel")}
        name="password"
        placeholder={t("dashboard.settings.security.form.placeholder")}
        ref={inputRef}
        suffix={<Eye onClick={() => handleEyeToggle(inputRef)} />}
        type="password"
      />
      <div className={buildValidationClassName(hasMinError)}>
        <span>{hasMinError ? <Close size={16} /> : <Check size={16} />}</span>
        <span>{t("dashboard.settings.security.form.lengthError")}</span>
      </div>
      <div className={buildValidationClassName(hasMatchError)}>
        <span>{hasMatchError ? <Close size={16} /> : <Check size={16} />}</span>
        <span>{t("dashboard.settings.security.form.strengthError")}</span>
      </div>
      <Button
        className="mr-2"
        disabled={hasMinError || hasMatchError}
        label={t("dashboard.settings.security.form.button.save")}
        type="submit"
      />
      <Button
        disabled={hasMinError || hasMatchError}
        label={t("dashboard.settings.security.form.button.cancel")}
        style="text"
        type="reset"
      />
    </NeetoForm>
  );
};

export default Form;
