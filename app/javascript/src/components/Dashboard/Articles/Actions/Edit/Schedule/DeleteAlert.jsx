import React from "react";

import { Alert } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";

const DeleteAlert = ({
  article,
  showDeleteAlert,
  setShowDeleteAlert,
  refetch,
}) => {
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      await articlesApi.deleteScheduledJob(article.id);
      setShowDeleteAlert(false);
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <Alert
      isOpen={showDeleteAlert}
      message={t("dashboard.articles.actions.edit.schedule.alert.message")}
      title={t("dashboard.articles.actions.edit.schedule.alert.title")}
      submitButtonLabel={t(
        "dashboard.articles.actions.edit.schedule.alert.label"
      )}
      onClose={() => setShowDeleteAlert(false)}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
