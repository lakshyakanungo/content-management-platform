import React, { useState, useEffect } from "react";

import { Spinner } from "@bigbinary/neetoui";
import { Form, Input as FormikInput, Button } from "@bigbinary/neetoui/formik";

import siteSettingsApi from "apis/siteSettings";

import { VALIDATION_SCHEMA } from "./constants";

import Layout from "../Layout";

const General = () => {
  const [siteName, setSiteName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSiteName = async () => {
    try {
      setLoading(true);
      const {
        data: { title },
      } = await siteSettingsApi.fetch();
      setSiteName(title);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async ({ siteName }) => {
    try {
      await siteSettingsApi.update({ title: siteName });
      fetchSiteName();
    } catch (error) {
      logger.log(error);
    }
  };

  useEffect(() => {
    fetchSiteName();
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
      className="mx-auto"
      description="Configure general attributes of knowledge base"
      header="General Settings"
    >
      <Form
        formikProps={{
          initialValues: {
            siteName,
          },
          validationSchema: VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        {({ resetForm }) => (
          <>
            <FormikInput
              helpText="Customize the site name which is used to show the site name in Open Graph Tags."
              label="Site title"
              name="siteName"
              labelProps={{
                className: "neeto-ui-text-gray-700 neeto-ui-text-sm",
              }}
            />
            <div>
              <Button className="mr-6" label="Save changes" type="submit" />
              <Button
                label="Cancel"
                style="text"
                type="reset"
                onClick={resetForm}
              />
            </div>
          </>
        )}
      </Form>
    </Layout>
  );
};

export default General;
