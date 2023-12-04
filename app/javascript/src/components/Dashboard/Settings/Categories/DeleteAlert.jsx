import React from "react";

import { Alert as NeetoAlert } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

import { useDeleteCategory } from "hooks/reactQuery/settings/category/useCategoriesApi";

const Alert = ({ category, showDeleteOverlay, setShowDeleteOverlay }) => {
  const { mutate: handleDelete } = useDeleteCategory({
    onSuccess: () => setShowDeleteOverlay(false),
  });

  const { t } = useTranslation();

  const handleEmptyCategoryDeletion = () =>
    handleDelete({
      id: category.id,
      payload: {
        move_into_category_id: null,
      },
    });

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
      onSubmit={handleEmptyCategoryDeletion}
    />
  );
};

export default Alert;
