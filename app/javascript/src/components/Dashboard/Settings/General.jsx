import React, { useState, useEffect } from "react";

import { Button, Spinner } from "@bigbinary/neetoui";
import { Form, Input as FormikInput } from "@bigbinary/neetoui/formik";
import * as yup from "yup";

import siteSettingsApi from "apis/siteSettings";

import Layout from "./Layout";

const General = () => {
  const [siteName, setSiteName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSiteName = async () => {
    try {
      setLoading(true);
      const {
        data: { title },
      } = await siteSettingsApi.fetch();
      // console.log(data);
      setSiteName(title);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async values => {
    try {
      await siteSettingsApi.update({ title: values.siteName });
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
          validationSchema: yup.object().shape({
            siteName: yup.string().required("Required"),
          }),
          onSubmit: handleSubmit,
        }}
      >
        {({ dirty, isSubmitting }) => (
          // console.log(props);
          <>
            <FormikInput
              helpText="Customize the site name which is used to show the site name in Open Graph Tags."
              label="Site title"
              name="siteName"
              // className="mb-4"
              labelProps={{
                className: "neeto-ui-text-gray-700 neeto-ui-text-sm",
              }}
            />
            <div>
              <Button
                className="mr-6"
                disabled={!dirty}
                label="Save changes"
                loading={isSubmitting}
                type="submit"
              />
              <Button
                disabled={!dirty}
                label="Cancel"
                style="text"
                type="reset"
              />
            </div>
          </>
        )}
      </Form>
    </Layout>
  );
};

export default General;
