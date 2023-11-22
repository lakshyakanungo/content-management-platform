import React, { useState, useEffect } from "react";

import { Spinner, Switch } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import siteApi from "apis/site";

import ChangePassword from "./ChangePassword";
import Form from "./Form";

import Layout from "../Layout";

const Security = () => {
  const [loading, setLoading] = useState(true);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(true);

  const { t } = useTranslation();

  const fetchSite = async () => {
    try {
      setLoading(true);
      const { data } = await siteApi.fetch();
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
      await siteApi.update({
        is_password_protected: value,
      });
      fetchSite();
    } catch (error) {
      logger.log(error);
    }
  };

  const handleToggle = () => {
    if (isPasswordRequired) updateSecurity(!isPasswordRequired);
    else setIsPasswordRequired(true);
  };

  useEffect(() => {
    fetchSite();
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
          <Form
            fetchSite={fetchSite}
            setShowChangePasswordForm={setShowChangePasswordForm}
          />
        ))}
    </Layout>
  );
};

export default Security;
