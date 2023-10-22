import React from "react";

import { Modal } from "@bigbinary/neetoui";
import { Select, Form, Button } from "@bigbinary/neetoui/formik";
import { Warning } from "neetoicons";
import * as yup from "yup";

import categoriesApi from "apis/categories";

const Delete = ({
  category,
  categoryMoveOptions,
  fetchCategories,
  showDeleteModal,
  setShowDeleteModal,
}) => {
  const { Header, Body, Footer } = Modal;

  const handleSubmit = async ({ selectedCategory }) => {
    // console.log(selectedCategory);
    try {
      await categoriesApi.destroy({
        id: category.id,
        payload: {
          id: category.id,
          move_into_category_id: selectedCategory.id,
        },
      });
      fetchCategories();
      setShowDeleteModal(false);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <Modal
      closeOnEsc
      closeOnOutsideClick
      isOpen={showDeleteModal}
      title="Delete category"
      onClose={() => setShowDeleteModal(false)}
    >
      <Header>
        <div className="flex flex-col gap-3 w-full">
          <h2 className="neeto-ui-text-gray-800">Delete Category</h2>
          <p>
            You are permanently deleting the <b>Neeto</b> category. This action
            cannot be undone. Are you sure you wish to continue?
          </p>
          <div className="flex neeto-ui-bg-error-100 gap-1 neeto-ui-rounded p-2">
            <Warning color="#BB121A" size={48} />
            <span className="">
              Category <b className="neeto-ui-text-error-800">Neeto</b> has 60
              articles. Before this category can be deleted, these articles
              needs to be moved to another category.
            </span>
          </div>
        </div>
      </Header>
      <Form
        formikProps={{
          initialValues: { selectedCategory: null },
          validationSchema: yup.object().shape({
            selectedCategory: yup
              .object()
              .shape({
                name: yup.string().required(),
                id: yup.string().required(),
              })
              .nullable()
              .required("Category to move articles into is required"),
          }),
          onSubmit: handleSubmit,
        }}
      >
        {({ resetForm }) => (
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
            <Footer className="">
              <Button label="Proceed" style="danger" type="submit" />
              <Button
                label="Cancel"
                style="text"
                type="reset"
                onClick={resetForm}
              />
            </Footer>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default Delete;
