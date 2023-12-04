import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { useAddCategory } from "hooks/reactQuery/settings/category/useCategoriesApi";

import {
  CREATE_CATEGORY_FORM_INITIAL_VALUE,
  FORM_VALIDATION_SCHEMA,
} from "./constants";

const Create = ({ showAddCategoryModal, setShowAddCategoryModal }) => {
  const { Header, Body, Footer } = Modal;

  const { t } = useTranslation();

  const { mutate: handleAddCategory } = useAddCategory({
    onSettled: () => setShowAddCategoryModal(false),
  });

  return (
    <Modal
      isOpen={showAddCategoryModal}
      onClose={() => setShowAddCategoryModal(false)}
    >
      <Header>
        <Typography style="h2" weight="medium">
          {t("dashboard.settings.categories.modal.create.title")}
        </Typography>
      </Header>
      <Form
        formikProps={{
          initialValues: CREATE_CATEGORY_FORM_INITIAL_VALUE,
          validationSchema: FORM_VALIDATION_SCHEMA,
          onSubmit: handleAddCategory,
        }}
      >
        <Body>
          <Input
            label={t("dashboard.settings.categories.modal.create.inputLabel")}
            name="name"
            labelProps={{
              className: "neeto-ui-text-gray-700 neeto-ui-font-light",
            }}
            placeholder={t(
              "dashboard.settings.categories.modal.create.inputPlaceholder"
            )}
          />
        </Body>
        <Footer>
          <Button
            className="mr-2"
            label={t("dashboard.settings.categories.modal.create.button.save")}
            type="submit"
          />
          <Button
            disabled={false}
            style="text"
            type="reset"
            label={t(
              "dashboard.settings.categories.modal.create.button.cancel"
            )}
            onClick={() => setShowAddCategoryModal(false)}
          />
        </Footer>
      </Form>
    </Modal>
  );
};

export default Create;
