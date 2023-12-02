import React from "react";

import { Modal } from "@bigbinary/neetoui";
import { Select, Form, Button } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import {
  useDeleteCategory,
  useFetchCategories,
} from "hooks/reactQuery/settings/category/useCategory";

import Header from "./Header";
import { buildValidationSchema } from "./utils";

const Delete = ({ category, showDeleteOverlay, setShowDeleteOverlay }) => {
  const { data: categories = [] } = useFetchCategories();

  const { Body, Footer } = Modal;

  const { t } = useTranslation();

  const { mutate: handleDelete } = useDeleteCategory({
    onSuccess: () => setShowDeleteOverlay(false),
  });

  const handleSubmit = ({ selectedCategory }) =>
    handleDelete({
      id: category.id,
      payload: {
        move_into_category_id: selectedCategory.id,
      },
    });

  const hasMultipleCategories = categories.length > 1;

  const categoryMoveOptions = categories.filter(
    item => item.id !== category.id
  );

  return (
    <Modal
      closeOnEsc
      closeOnOutsideClick
      isOpen={showDeleteOverlay}
      title={t("dashboard.settings.categories.modal.delete.title")}
      onClose={() => setShowDeleteOverlay(false)}
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
          validationSchema: buildValidationSchema(categoryMoveOptions),
          onSubmit: handleSubmit,
        }}
      >
        {({ dirty }) => (
          <>
            {hasMultipleCategories && (
              <Body className="w-11/12">
                <Select
                  isClearable
                  isSearchable
                  className="neeto-ui-text-gray-500 neeto-ui-font-normal"
                  name="selectedCategory"
                  optionRemapping={{ label: "name", value: "id" }}
                  options={categoryMoveOptions}
                  label={t(
                    "dashboard.settings.categories.modal.delete.selectLabel"
                  )}
                  placeholder={t(
                    "dashboard.settings.categories.modal.delete.selectPlaceholder"
                  )}
                />
              </Body>
            )}
            <Footer>
              <Button
                className="mr-2"
                disabled={!dirty && hasMultipleCategories}
                style="danger"
                type="submit"
                label={t(
                  "dashboard.settings.categories.modal.delete.button.save"
                )}
              />
              <Button
                disabled={false}
                loading={false}
                style="text"
                type="reset"
                label={t(
                  "dashboard.settings.categories.modal.delete.button.cancel"
                )}
                onClick={() => setShowDeleteOverlay(false)}
              />
            </Footer>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default Delete;
