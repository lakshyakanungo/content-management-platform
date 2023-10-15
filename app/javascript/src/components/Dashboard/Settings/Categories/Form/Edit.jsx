import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import * as yup from "yup";

const Edit = ({
  category,
  handleEdit,
  showEditCategoryModal,
  setShowEditCategoryModal,
}) => {
  const { Header, Body, Footer } = Modal;

  const handleReset = () => {
    setShowEditCategoryModal(false);
  };

  return (
    <Modal
      isOpen={showEditCategoryModal}
      onClose={() => setShowEditCategoryModal(false)}
    >
      <Header>
        <Typography style="h2" weight="medium">
          Edit Category
        </Typography>
      </Header>
      <Form
        formikProps={{
          initialValues: { category: category.name },
          validationSchema: yup.object().shape({
            category: yup.string().required("Category title is required"),
          }),
          onSubmit: handleEdit,
        }}
      >
        <Body>
          <Input
            label="Category title"
            name="category"
            placeholder="Enter category title here."
            labelProps={{
              className: "neeto-ui-text-gray-700 neeto-ui-font-light",
            }}
          />
        </Body>
        <Footer>
          <Button className="mr-2" label="Save changes" type="submit" />
          <Button
            label="Cancel"
            style="text"
            type="reset"
            onClick={handleReset}
          />
        </Footer>
      </Form>
    </Modal>
  );
};

export default Edit;
