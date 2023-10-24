import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";

import categoriesApi from "apis/categories";

import { VALIDATION_SCHEMA } from "./constants";

const Edit = ({
  category,
  fetchCategories,
  showEditModal,
  setShowEditModal,
}) => {
  const { Header, Body, Footer } = Modal;

  const handleEdit = async ({ category: name }) => {
    try {
      await categoriesApi.update({
        id: category.id,
        payload: { name },
      });
      fetchCategories();
      setShowEditModal(false);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
      <Header>
        <Typography style="h2" weight="medium">
          Edit Category
        </Typography>
      </Header>
      <Form
        formikProps={{
          initialValues: { category: category.name },
          validationSchema: VALIDATION_SCHEMA,
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
            onClick={() => setShowEditModal(false)}
          />
        </Footer>
      </Form>
    </Modal>
  );
};

export default Edit;
