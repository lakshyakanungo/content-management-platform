import React from "react";

import { Button } from "@bigbinary/neetoui";
import { Form, Input as FormikInput } from "@bigbinary/neetoui/formik";
import * as yup from "yup";

import Layout from "./Layout";

const General = () => (
  <Layout
    description="Configure general attributes of knowledge base"
    header="General Settings"
  >
    <Form
      formikProps={{
        initialValues: {
          siteName: "Spinkart",
        },
        validationSchema: yup.object().shape({
          siteName: yup.string().required("Required"),
        }),
      }}
    >
      {({ dirty }) => (
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

export default General;
