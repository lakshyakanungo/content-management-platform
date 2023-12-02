import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { useAddCategory } from "hooks/reactQuery/category/useCategory";
import { useSelectedCategoriesStore } from "hooks/zustand/useSelectedCategoriesStore";

import {
  ADD_CATEGORY_FORM_INITIAL_VALUE,
  ADD_CATEGORY_FORM_VALIDATION_SCHEMA,
} from "./constants";

const AddCategory = ({ showAddCategoryModal, setShowAddCategoryModal }) => {
  const { Header, Body, Footer } = Modal;

  const { t } = useTranslation();

  const { setSelectedCategories } = useSelectedCategoriesStore();

  const { mutate: handleAddCategory } = useAddCategory({
    onSettled: () => {
      setShowAddCategoryModal(false);
      setSelectedCategories([]);
    },
  });

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
          {t("dashboard.articles.menu.addCategory.title")}
        </Typography>
      </Header>
      <Form
        formikProps={{
          initialValues: ADD_CATEGORY_FORM_INITIAL_VALUE,
          validationSchema: ADD_CATEGORY_FORM_VALIDATION_SCHEMA,
          onSubmit: handleAddCategory,
        }}
      >
        <Body>
          <Input
            label={t("dashboard.articles.menu.addCategory.inputLabel")}
            name="name"
            labelProps={{
              className: "neeto-ui-text-gray-700 neeto-ui-font-light",
            }}
            placeholder={t(
              "dashboard.articles.menu.addCategory.inputPlaceholder"
            )}
          />
        </Body>
        <Footer>
          <Button className="mr-2" label="Add" type="submit" />
          <Button
            disabled={false}
            label={t("dashboard.articles.menu.addCategory.buttonLabel")}
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
