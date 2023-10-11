import React from "react";

import { Button } from "@bigbinary/neetoui";
import {
  Form as FormikForm,
  Input as FormikInput,
} from "@bigbinary/neetoui/formik";
import { Check, Close } from "neetoicons";
import * as yup from "yup";

const FormRow = ({ data, setRedirections, onCollapse }) => {
  const handleSubmit = (values, { resetForm }) => {
    // console.log(values);
    setRedirections(prev => [
      ...prev,
      {
        from: values.fromUrl,
        to: values.toUrl,
      },
    ]);
    resetForm();
    onCollapse();
  };

  return (
    <FormikForm
      formikProps={{
        initialValues: data,
        validationSchema: yup.object().shape({
          fromUrl: yup.string().required("From path URL must be valid"),
          toUrl: yup.string().required("To path URL must be valid"),
        }),
        onSubmit: handleSubmit,
      }}
    >
      {({ dirty }) => (
        // console.log(props);
        <div className="neeto-ui-bg-white grid grid-cols-12 justify-between p-2 gap-2 items-start">
          <FormikInput
            // label="Site title"
            className="col-span-5"
            name="fromUrl"
            // labelProps={{
            //   className: "neeto-ui-text-gray-700 neeto-ui-text-sm",
            // }}
          />
          <FormikInput className="col-span-5" name="toUrl" />
          <Button
            className="neeto-ui-text-success-500"
            disabled={!dirty}
            icon={Check}
            style="link"
            type="submit"
          />
          <Button
            className="neeto-ui-text-error-500"
            disabled={!dirty}
            icon={Close}
            style="text"
            type="reset"
          />
        </div>
      )}
    </FormikForm>
  );
};

export default FormRow;
