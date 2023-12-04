import React from "react";

import { Alert } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import { useDeleteSchedule } from "hooks/reactQuery/articles/actions/edit/useSchedulesApi";

const DeleteAlert = ({ article, showDeleteAlert, setShowDeleteAlert }) => {
  const { t } = useTranslation();

  const { mutate: handleDelete } = useDeleteSchedule();

  return (
    <Alert
      isOpen={showDeleteAlert}
      message={t("dashboard.articles.actions.edit.schedule.alert.message")}
      title={t("dashboard.articles.actions.edit.schedule.alert.title")}
      submitButtonLabel={t(
        "dashboard.articles.actions.edit.schedule.alert.label"
      )}
      onClose={() => setShowDeleteAlert(false)}
      onSubmit={() => handleDelete(article.id)}
    />
  );
};

export default DeleteAlert;
