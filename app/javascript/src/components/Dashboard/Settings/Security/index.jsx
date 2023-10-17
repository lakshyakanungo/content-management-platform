import React, { useState, useEffect } from "react";

import { Spinner, Switch } from "@bigbinary/neetoui";

import siteSettingsApi from "apis/siteSettings";

import ChangePassword from "./ChangePassword";
import Form from "./Form";

import Layout from "../Layout";

const Security = () => {
  const [loading, setLoading] = useState(true);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(true);

  const fetchSiteSettings = async () => {
    try {
      setLoading(true);
      const { data } = await siteSettingsApi.show();
      const {
        is_password_protected: isPasswordProtected,
        has_password: hasPassword,
      } = data;
      // console.log(data);
      setIsPasswordRequired(isPasswordProtected);
      setShowChangePasswordForm(hasPassword);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSecurity = async value => {
    // console.log(value);
    try {
      await siteSettingsApi.update({ is_password_protected: value });
      fetchSiteSettings();
    } catch (error) {
      logger.log(error);
    }
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
      description="Configure security related settings for your site."
      header="Security"
    >
      <div className="flex justify-between">
        <span>Password protect your site</span>
        <Switch
          checked={isPasswordRequired}
          onChange={() => updateSecurity(!isPasswordRequired)}
        />
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
