import React, { useState } from "react";

import { Spinner, Switch } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import {
  useFetchSiteSecurity,
  useUpdateSiteSecurity,
} from "hooks/reactQuery/settings/security/useSecurity";

import ChangePassword from "./ChangePassword";
import Form from "./Form";

import Layout from "../Layout";

const Security = () => {
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(true);

  const { isFetching, refetch } = useFetchSiteSecurity({
    setIsPasswordRequired,
    setShowChangePasswordForm,
  });

  const { mutate: updateSecurity } = useUpdateSiteSecurity();

  const { t } = useTranslation();

  const handleToggle = () => {
    if (isPasswordRequired) updateSecurity();
    else setIsPasswordRequired(true);
  };

  if (isFetching) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Layout
      className="mx-24"
      description={t("dashboard.settings.security.description")}
      header={t("dashboard.settings.security.header")}
    >
      <div className="flex justify-between">
        <span>{t("dashboard.settings.security.title")}</span>
        <Switch checked={isPasswordRequired} onChange={handleToggle} />
      </div>
      {isPasswordRequired &&
        (showChangePasswordForm ? (
          <ChangePassword
            setShowChangePasswordForm={setShowChangePasswordForm}
          />
        ) : (
          <Form refetch={refetch} />
        ))}
    </Layout>
  );
};

export default Security;
