import React from "react";

import { Alert } from "neetoui";
import { useTranslation } from "react-i18next";

const DeleteAlert = ({ showDeleteAlert, setShowDeleteAlert, handleDelete }) => {
  const { t } = useTranslation();

  return (
    <Alert
      isOpen={showDeleteAlert}
      message={t("dashboard.settings.redirections.row.dropdown.alert.message")}
      title={t("dashboard.settings.redirections.row.dropdown.alert.title")}
      submitButtonLabel={t(
        "dashboard.settings.redirections.row.dropdown.alert.label"
      )}
      onClose={() => setShowDeleteAlert(false)}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
