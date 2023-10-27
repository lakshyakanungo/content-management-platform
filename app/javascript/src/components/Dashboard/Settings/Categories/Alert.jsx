import React from "react";

import { Alert as NeetoAlert } from "neetoui";
import { useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";

const Alert = ({
  fetchCategories,
  category,
  showDeleteOverlay,
  setShowDeleteOverlay,
}) => {
  const { t } = useTranslation();

  const handleSubmit = async ({ selectedCategory }) => {
    try {
      await categoriesApi.destroy({
        id: category.id,
        payload: {
          id: category.id,
          move_into_category_id: selectedCategory?.id,
        },
      });
      fetchCategories();
      setShowDeleteOverlay(false);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <NeetoAlert
      isOpen={showDeleteOverlay}
      message={t("dashboard.settings.categories.alert.message")}
      submitButtonLabel={t("dashboard.settings.categories.alert.buttonLabel")}
      title={t("dashboard.settings.categories.alert.title")}
      onClose={() => setShowDeleteOverlay(false)}
      onSubmit={handleSubmit}
    />
  );
};

export default Alert;
