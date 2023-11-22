import React, { useContext } from "react";

import { Alert as NeetoAlert } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

import categoriesApi from "apis/categories";

import { CategoriesContext } from ".";

const Alert = ({ category, showDeleteOverlay, setShowDeleteOverlay }) => {
  const { fetchCategories } = useContext(CategoriesContext);

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
      submitButtonLabel={t("dashboard.settings.categories.alert.buttonLabel")}
      title={t("dashboard.settings.categories.alert.title")}
      message={
        <Trans
          components={[<b key={1} />]}
          i18nKey="dashboard.settings.categories.alert.message"
          values={{ name: category.name }}
        />
      }
      onClose={() => setShowDeleteOverlay(false)}
      onSubmit={handleSubmit}
    />
  );
};

export default Alert;
