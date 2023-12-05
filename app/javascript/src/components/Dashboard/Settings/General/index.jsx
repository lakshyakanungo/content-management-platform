import React from "react";

import { Spinner } from "neetoui";
import { Form, Input as FormikInput, Button } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  useFetchSite,
  useUpdateSite,
} from "hooks/reactQuery/settings/general/useSiteApi";

import { VALIDATION_SCHEMA } from "./constants";

import Layout from "../Layout";

const General = () => {
  const { data: site, isFetching } = useFetchSite();
  const { mutate: updateSite } = useUpdateSite();

  const { t } = useTranslation();

  const handleSubmit = ({ siteName }) => updateSite({ title: siteName });

  if (isFetching) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Layout
      className="mx-auto"
      description={t("dashboard.settings.general.description")}
      header={t("dashboard.settings.general.header")}
    >
      <Form
        formikProps={{
          initialValues: {
            siteName: site.title,
          },
          validationSchema: VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        {({ resetForm }) => (
          <>
            <FormikInput
              helpText={t("dashboard.settings.general.form.input.helpText")}
              label={t("dashboard.settings.general.form.input.label")}
              name="siteName"
              labelProps={{
                className: "neeto-ui-text-gray-700 neeto-ui-text-sm",
              }}
            />
            <div>
              <Button
                className="mr-6"
                label={t("dashboard.settings.general.form.button.save.label")}
                type="submit"
              />
              <Button
                label={t("dashboard.settings.general.form.button.cancel.label")}
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
