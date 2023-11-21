import React from "react";

import { Alert } from "@bigbinary/neetoui";
import { Trans, useTranslation } from "react-i18next";

const DeleteAlert = ({
  showDeleteAlert,
  setShowDeleteAlert,
  record,
  handleDelete,
}) => {
  const { t } = useTranslation();

  const { id, title } = record;

  const handleSubmit = () => {
    handleDelete(id);
    setShowDeleteAlert(false);
  };

  return (
    <Alert
      isOpen={showDeleteAlert}
      title={t("dashboard.articles.page.table.dropdown.alert.title")}
      message={
        <Trans
          components={[<b key={1} />]}
          i18nKey="dashboard.articles.page.table.dropdown.alert.message"
          values={{ title }}
        />
      }
      submitButtonLabel={t(
        "dashboard.articles.page.table.dropdown.alert.label"
      )}
      onClose={() => setShowDeleteAlert(false)}
      onSubmit={handleSubmit}
    />
  );
};

export default DeleteAlert;
