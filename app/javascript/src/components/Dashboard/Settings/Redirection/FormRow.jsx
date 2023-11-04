import React from "react";

import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import { Check, Close } from "neetoicons";

import redirectionsApi from "apis/redirections";

import {
  buildFormInitialValues,
  buildFormValidationSchema,
  formatToUrl,
} from "./utils";

const FormRow = ({
  isEdit = false,
  data,
  handleClose,
  fetchRedirections,
  redirections,
}) => {
  const handleSubmit = async ({ fromUrl, toUrl }) => {
    const payload = { from: fromUrl, to: formatToUrl(toUrl) };

    try {
      if (isEdit) {
        await redirectionsApi.update({
          id: data.id,
          payload,
        });
      } else {
        await redirectionsApi.create(payload);
      }
      fetchRedirections();
      handleClose();
    } catch (error) {
      logger.log(error);
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
        <Input className="col-span-5" name="fromUrl" />
        <Input className="col-span-5" name="toUrl" />
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
