import React from "react";

import { Eye } from "neetoicons";
import { Input, Button } from "neetoui";
import { useTranslation } from "react-i18next";

const ChangePassword = ({ setShowChangePasswordForm }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Input
        disabled
        className="mb-4"
        label={t("dashboard.settings.security.form.changePassword.inputLabel")}
        suffix={<Eye />}
        type="password"
        value="********"
      />
      <Button
        label={t("dashboard.settings.security.form.changePassword.buttonLabel")}
        type="submit"
        onClick={() => setShowChangePasswordForm(false)}
      />
    </div>
  );
};

export default ChangePassword;
