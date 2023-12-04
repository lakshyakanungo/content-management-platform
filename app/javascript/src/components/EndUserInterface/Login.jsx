import React from "react";

import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { useAuth } from "hooks/reactQuery/endUserInterface/useAuthApi";
import { setToLocalStorage } from "utils/storage";

import { LOGIN_FORM_INITIAL_VALUE } from "./constants";

const Login = ({ siteName }) => {
  const { mutate: handleAuthentication } = useAuth({
    onSuccess: ({ data }) => {
      setToLocalStorage("authToken", data.authenticationToken);
      window.location.href = "/eui";
    },
  });

  const { t } = useTranslation();

  return (
    <>
      <div className="w-full text-center font-bold p-4 text-base border neeto-ui-border-gray-100 neeto-ui-text-gray-800">
        {siteName}
      </div>
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
              initialValues: LOGIN_FORM_INITIAL_VALUE,
              onSubmit: handleAuthentication,
            }}
          >
            <Input
              className="my-4"
              label={t("eui.login.input.label")}
              name="password"
              placeholder={t("eui.login.input.placeholder")}
              type="password"
              labelProps={{
                className:
                  "neeto-ui-text-sm neeto-ui-text-gray-700 neeto-ui-font-light",
              }}
            />
            <Button
              fullWidth
              className="mt-2 p-3 text-center"
              label={t("eui.login.button.label")}
              type="submit"
            />
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
