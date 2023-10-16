import React from "react";

import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import { Check, Close } from "neetoicons";

import redirectionsApi from "apis/redirections";

import {
  FORM_VALIDATION_SCHEMA,
  buildFormInitialValues,
  formatToUrl,
} from "./utils";

const FormRow = ({ isEdit = false, data, onCollapse, fetchRedirections }) => {
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
      onCollapse();
    } catch (error) {
      logger.log(error);
    }
  };

  const handleReset = resetForm => {
    resetForm();
    onCollapse();
  };

  return (
    <Form
      formikProps={{
        initialValues: buildFormInitialValues({ isEdit, data }),
        validationSchema: FORM_VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
      }}
    >
      {({ resetForm }) => (
        // console.log(props);
        <div className="neeto-ui-bg-white grid grid-cols-12 justify-between p-2 gap-2 items-start">
          <Input
            // label="Site title"
            className="col-span-5"
            name="fromUrl"
            // labelProps={{
            //   className: "neeto-ui-text-gray-700 neeto-ui-text-sm",
            // }}
          />
          <Input className="col-span-5" name="toUrl" />
          <Button
            className="neeto-ui-text-success-500"
            // disabled={dirty}
            icon={Check}
            style="link"
            type="submit"
          />
          <Button
            className="neeto-ui-text-error-500"
            // disabled={dirty}
            icon={Close}
            style="text"
            type="reset"
            onClick={() => handleReset(resetForm)}
          />
        </div>
      )}
    </Form>
  );
};

export default FormRow;
