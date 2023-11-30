import React, { useState, useRef } from "react";

import { Check, Close } from "neetoicons";
import { Form as NeetoForm, Input, Button } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useUpdatePassword } from "hooks/reactQuery/settings/security/useSecurity";

import { INITIAL_VALUES } from "./constants";
import {
  TogglePassword,
  buildValidationClassName,
  handleToggle,
  validateForm,
} from "./utils";

const Form = ({ refetch }) => {
  const [isMinError, setIsMinError] = useState(true);
  const [isMatchError, setIsMatchError] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { mutate: updatePassword } = useUpdatePassword();

  const inputRef = useRef(null);

  const { t } = useTranslation();

  return (
    <NeetoForm
      formikProps={{
        initialValues: INITIAL_VALUES,
        validate: values =>
          validateForm({ values, setIsMinError, setIsMatchError }),
        onSubmit: updatePassword,
      }}
    >
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
      <div className={buildValidationClassName(isMinError)}>
        <span>{isMinError ? <Close size={16} /> : <Check size={16} />}</span>
        <span>{t("dashboard.settings.security.form.lengthError")}</span>
      </div>
      <div className={buildValidationClassName(isMatchError)}>
        <span>{isMatchError ? <Close size={16} /> : <Check size={16} />}</span>
        <span>{t("dashboard.settings.security.form.strengthError")}</span>
      </div>
      <Button
        className="mr-2"
        disabled={isMinError || isMatchError}
        label={t("dashboard.settings.security.form.button.save")}
        type="submit"
      />
      <Button
        disabled={false}
        label={t("dashboard.settings.security.form.button.cancel")}
        style="text"
        type="reset"
        onClick={refetch}
      />
    </NeetoForm>
  );
};

export default Form;
