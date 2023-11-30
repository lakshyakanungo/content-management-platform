import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { useEditCategory } from "hooks/reactQuery/settings/category/useCategory";

import { FORM_VALIDATION_SCHEMA } from "./constants";

const Edit = ({ category, showEditModal, setShowEditModal }) => {
  const { Header, Body, Footer } = Modal;

  const { t } = useTranslation();

  const { mutate: handleEdit } = useEditCategory({ setShowEditModal });

  return (
    <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
      <Header>
        <Typography style="h2" weight="medium">
          {t("dashboard.settings.categories.modal.edit.title")}
        </Typography>
      </Header>
      <Form
        formikProps={{
          initialValues: { name: category.name },
          validationSchema: FORM_VALIDATION_SCHEMA,
          onSubmit: ({ name }) => handleEdit({ name, category }),
        }}
      >
        <Body>
          <Input
            label={t("dashboard.settings.categories.modal.edit.inputLabel")}
            name="name"
            labelProps={{
              className: "neeto-ui-text-gray-700 neeto-ui-font-light",
            }}
            placeholder={t(
              "dashboard.settings.categories.modal.edit.inputPlaceholder"
            )}
          />
        </Body>
        <Footer>
          <Button
            className="mr-2"
            label={t("dashboard.settings.categories.modal.edit.button.save")}
            type="submit"
          />
          <Button
            label={t("dashboard.settings.categories.modal.edit.button.cancel")}
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
