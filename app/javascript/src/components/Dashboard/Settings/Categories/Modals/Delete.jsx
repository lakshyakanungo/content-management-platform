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
  hasMultipleCategories,
}) => {
  const { Header, Body, Footer } = Modal;

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
            You are permanently deleting the <b>{category.name}</b> category.
            This action cannot be undone. Are you sure you wish to continue?
          </p>
          <div className="flex neeto-ui-bg-error-100 gap-1 neeto-ui-rounded p-2">
            <Warning color="#BB121A" size={48} />
            {hasMultipleCategories ? (
              <span className="">
                Category
                <b className="neeto-ui-text-error-800">
                  &nbsp;{category.name}&nbsp;
                </b>
                has&nbsp;{category.articles_count}&nbsp;articles. Before this
                category can be deleted, these articles needs to be moved to
                another category.
              </span>
            ) : (
              <span className="">
                Category
                <b className="neeto-ui-text-error-800">
                  &nbsp;{category.name}&nbsp;
                </b>
                is the only category present and it has&nbsp;
                {category.articles_count}&nbsp;articles. On proceeding, all the
                articles will be moved to a new category
                <b className="neeto-ui-text-error-800">&nbsp;General&nbsp;</b>.
              </span>
            )}
          </div>
        </div>
      </Header>
      <Form
        formikProps={{
          initialValues: {
            showSelect: hasMultipleCategories,
            selectedCategory: null,
          },
          validationSchema: yup.object().shape({
            showSelect: yup.boolean(),
            selectedCategory: yup
              .object()
              .shape({
                name: yup.string().required(),
                id: yup.string().required(),
              })
              .nullable()
              .when("showSelect", {
                is: true,
                then: yup
                  .object()
                  .shape({
                    name: yup.string().required(),
                    id: yup.string().required(),
                  })
                  .nullable()
                  .required("Category to move articles into is required"),
              }),
          }),
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
