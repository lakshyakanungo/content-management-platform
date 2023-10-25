import React from "react";

import { Modal } from "@bigbinary/neetoui";
import { Select, Form, Button } from "@bigbinary/neetoui/formik";

import categoriesApi from "apis/categories";

import { VALIDATION_SCHEMA } from "./constants";
import Header from "./Header";

const Delete = ({
  category,
  categories,
  fetchCategories,
  showDeleteModal,
  setShowDeleteModal,
  hasMultipleCategories,
}) => {
  const { Body, Footer } = Modal;

  const handleSubmit = async ({ selectedCategory }) => {
    // console.log(selectedCategory);
    try {
      await categoriesApi.destroy({
        id: category.id,
        payload: {
          id: category.id,
          move_into_category_id: selectedCategory?.id,
        },
      });
      fetchCategories();
      setShowDeleteModal(false);
    } catch (error) {
      logger.log(error);
    }
  };

  const categoryMoveOptions = categories.filter(
    item => item.id !== category.id
  );

  return (
    <Modal
      closeOnEsc
      closeOnOutsideClick
      isOpen={showDeleteModal}
      title="Delete category"
      onClose={() => setShowDeleteModal(false)}
    >
      <Header
        category={category}
        hasMultipleCategories={hasMultipleCategories}
      />
      <Form
        formikProps={{
          initialValues: {
            showSelect: hasMultipleCategories,
            selectedCategory: null,
          },
          validationSchema: VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        {({ dirty }) => (
          <>
            <Body className="w-11/12">
              <Select
                isClearable
                isSearchable
                className="neeto-ui-text-gray-500 neeto-ui-font-normal"
                label="Select a category to move these articles into*"
                name="selectedCategory"
                optionRemapping={{ label: "name", value: "id" }}
                options={categoryMoveOptions}
                placeholder="Search category"
              />
            </Body>
            <Footer>
              <Button
                className="mr-2"
                disabled={!dirty && hasMultipleCategories}
                label="Proceed"
                style="danger"
                type="submit"
              />
              <Button
                disabled={!dirty && hasMultipleCategories}
                label="Cancel"
                style="text"
                type="reset"
                onClick={() => setShowDeleteModal(false)}
              />
            </Footer>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default Delete;
