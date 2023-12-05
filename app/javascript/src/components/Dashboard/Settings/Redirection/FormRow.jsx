import React from "react";

import { Check, Close } from "neetoicons";
import { Form, Input, Button } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  useCreateRedirection,
  useUpdateRedirection,
} from "hooks/reactQuery/settings/redirection/useRedirectionsApi";

import { buildFormInitialValues, buildFormValidationSchema } from "./utils";

const FormRow = ({ isEdit = false, data, handleClose, redirections }) => {
  const { mutate: updateRedirection } = useUpdateRedirection({
    onSuccess: handleClose,
  });

  const { mutate: createRedirection } = useCreateRedirection({
    onSuccess: handleClose,
  });

  const { t } = useTranslation();

  const handleSubmit = ({ from, to }) => {
    const payload = { from, to };
    if (isEdit) {
      updateRedirection({
        id: data.id,
        payload,
      });
    } else {
      createRedirection(payload);
    }
  };

  return (
    <Form
      formikProps={{
        initialValues: buildFormInitialValues({ isEdit, data }),
        validationSchema: buildFormValidationSchema({
          redirections,
          isEdit,
          data,
        }),
        onSubmit: handleSubmit,
      }}
    >
      <div className="neeto-ui-bg-white grid grid-cols-12 justify-between p-2 gap-2 items-start">
        <Input
          className="col-span-5"
          name="from"
          placeholder={t(
            "dashboard.settings.redirections.formRow.placeholder.from"
          )}
        />
        <Input
          className="col-span-5"
          name="to"
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
