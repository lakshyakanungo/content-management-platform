import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import * as yup from "yup";

const AddCategory = ({
  handleAddCategory,
  showAddCategoryModal,
  setShowAddCategoryModal,
}) => {
  const { Header, Body, Footer } = Modal;

  const handleReset = () => {
    setShowAddCategoryModal(false);
  };

  return (
    <Modal
      isOpen={showAddCategoryModal}
      onClose={() => setShowAddCategoryModal(false)}
    >
      <Header>
        <Typography style="h2" weight="medium">
          New Category
        </Typography>
      </Header>
      <Form
        formikProps={{
          initialValues: { category: "" },
          validationSchema: yup.object().shape({
            category: yup.string().required("Category title is required"),
          }),
          onSubmit: handleAddCategory,
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
          <Button className="mr-2" label="Add" type="submit" />
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

export default AddCategory;
