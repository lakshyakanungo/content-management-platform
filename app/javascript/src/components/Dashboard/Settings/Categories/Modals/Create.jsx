import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";

import categoriesApi from "apis/categories";

import { VALIDATION_SCHEMA } from "./constants";

const Create = ({
  fetchCategories,
  showAddCategoryModal,
  setShowAddCategoryModal,
}) => {
  const { Header, Body, Footer } = Modal;

  const handleAddCategory = async ({ category }) => {
    try {
      await categoriesApi.create({ name: category });
      fetchCategories();
    } catch (error) {
      logger.log(error);
    } finally {
      setShowAddCategoryModal(false);
    }
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
          validationSchema: VALIDATION_SCHEMA,
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
            onClick={() => setShowAddCategoryModal(false)}
          />
        </Footer>
      </Form>
    </Modal>
  );
};

export default Create;
