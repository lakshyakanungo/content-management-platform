import React from "react";

import { Alert as NeetoAlert } from "neetoui";
import { useTranslation } from "react-i18next";

const Alert = ({
  showDeleteAlert,
  setShowDeleteAlert,
  selectedArticleIds,
  handleBulkDelete,
}) => {
  const { t } = useTranslation();

  const handleSubmit = () => {
    handleBulkDelete(selectedArticleIds);
    setShowDeleteAlert(false);
  };

  return (
    <NeetoAlert
      isOpen={showDeleteAlert}
      title={t("dashboard.articles.page.subheader.leftActionGroup.alert.title")}
      message={t(
        "dashboard.articles.page.subheader.leftActionGroup.alert.message"
      )}
      submitButtonLabel={t(
        "dashboard.articles.page.subheader.leftActionGroup.alert.label"
      )}
      onClose={() => setShowDeleteAlert(false)}
      onSubmit={handleSubmit}
    />
  );
};

export default Alert;
