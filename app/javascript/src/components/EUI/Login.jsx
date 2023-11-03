import React from "react";

import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

// import siteSettingsApi from "apis/siteSettings";
import authApi from "apis/auth";
import { setToLocalStorage } from "utils/storage";

const Login = ({ siteName, setIsAuthenticated }) => {
  const { t } = useTranslation();

  const handleSubmit = async ({ password }) => {
    try {
      const {
        data: { authenticationToken },
      } = await authApi.authenticate({ password });
      // console.log(authenticationToken);
      setToLocalStorage("authToken", authenticationToken);
      // console.log(authenticationToken);
      setIsAuthenticated(true);
      // history.push("/kb");
      // TODO: check where history and where window.location.href
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <div className="flex-grow flex justify-center mt-52">
      <div className="mb-4">
        <div className="neeto-ui-text-2xl neeto-ui-text-gray-800 neeto-ui-font-medium">
          {t("eui.login.header", { name: siteName })}
        </div>
        <div className="neeto-ui-text-base neeto-ui-text-gray-600 neeto-ui-font-light">
          {t("eui.login.subheader", { name: siteName })}
        </div>
        <Form
          formikProps={{
            initialValues: { password: "" },
            onSubmit: handleSubmit,
          }}
        >
          <Input
            className="my-4"
            label="Password"
            name="password"
            placeholder="Enter password here"
            type="password"
            labelProps={{
              className:
                "neeto-ui-text-sm neeto-ui-text-gray-700 neeto-ui-font-light",
            }}
          />
          <Button
            fullWidth
            className="mt-2 p-3 text-center"
            label="Continue"
            type="submit"
          />
        </Form>
      </div>
    </div>
  );
};

export default Login;
