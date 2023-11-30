import React from "react";

import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import { Check, Close } from "neetoicons";
import { useTranslation } from "react-i18next";

import { useUpdateRedirection } from "hooks/reactQuery/settings/redirection/useRedirection";

import { buildFormInitialValues, buildFormValidationSchema } from "./utils";

const FormRow = ({ isEdit = false, data, handleClose, redirections }) => {
  const { mutate: updateRedirection } = useUpdateRedirection();

  const { t } = useTranslation();

  return (
    <Form
      formikProps={{
        initialValues: buildFormInitialValues({ isEdit, data }),
        validationSchema: buildFormValidationSchema({
          redirections,
          isEdit,
          data,
        }),
        onSubmit: ({ fromUrl, toUrl }) =>
          updateRedirection({ fromUrl, toUrl, isEdit, handleClose, data }),
      }}
    >
      <div className="neeto-ui-bg-white grid grid-cols-12 justify-between p-2 gap-2 items-start">
        <Input
          className="col-span-5"
          name="fromUrl"
          placeholder={t(
            "dashboard.settings.redirections.formRow.placeholder.from"
          )}
        />
        <Input
          className="col-span-5"
          name="toUrl"
          placeholder={t(
            "dashboard.settings.redirections.formRow.placeholder.to"
          )}
        />
        <Button
          className="neeto-ui-text-success-500"
          icon={Check}
          style="link"
          type="submit"
        />
        <Button
          className="neeto-ui-text-error-500"
          disabled={false}
          icon={Close}
          style="text"
          type="reset"
          onClick={handleClose}
        />
      </div>
    </Form>
  );
};

export default FormRow;
