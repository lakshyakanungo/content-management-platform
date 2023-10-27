import React, { useState, useEffect } from "react";

import { Spinner, Switch } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import siteSettingsApi from "apis/siteSettings";

import ChangePassword from "./ChangePassword";
import Form from "./Form";

import Layout from "../Layout";

const Security = () => {
  const [loading, setLoading] = useState(true);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(true);

  const { t } = useTranslation();

  const fetchSiteSettings = async () => {
    try {
      setLoading(true);
      const { data } = await siteSettingsApi.fetch();
      const { isPasswordProtected } = data;
      setIsPasswordRequired(isPasswordProtected);
      setShowChangePasswordForm(isPasswordProtected);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSecurity = async value => {
    try {
      await siteSettingsApi.update({
        is_password_protected: value,
      });
      fetchSiteSettings();
    } catch (error) {
      logger.log(error);
    }
  };

  const handleToggle = () => {
    if (isPasswordRequired) updateSecurity(!isPasswordRequired);
    else setIsPasswordRequired(true);
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  if (loading) {
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
          <Form fetchSiteSettings={fetchSiteSettings} />
        ))}
    </Layout>
  );
};

export default Security;
