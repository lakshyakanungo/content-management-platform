import React from "react";

import { Form, Input, Button } from "@bigbinary/neetoui/formik";

import siteSettingsApi from "apis/siteSettings";

const Login = ({ siteName, setIsAuthenticated }) => {
  const handleSubmit = async ({ password }) => {
    try {
      await siteSettingsApi.authenticate({ password });
      setIsAuthenticated(true);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <div className="flex-grow flex justify-center mt-52">
      <div className="mb-4">
        <div className="neeto-ui-text-2xl neeto-ui-text-gray-800 neeto-ui-font-medium">
          {siteName} is password protected!
        </div>
        <div className="neeto-ui-text-base neeto-ui-text-gray-600 neeto-ui-font-light">
          Enter the password to gain access to {siteName}.
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
