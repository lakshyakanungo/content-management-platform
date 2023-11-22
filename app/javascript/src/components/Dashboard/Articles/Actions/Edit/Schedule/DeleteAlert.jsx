import React from "react";

import { Alert } from "@bigbinary/neetoui";

import articlesApi from "apis/articles";

const DeleteAlert = ({
  article,
  showDeleteAlert,
  setShowDeleteAlert,
  refetch,
}) => {
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
      message="The changes made in the scheduled update will be lost and can't be restored"
      submitButtonLabel="Confirm deletion"
      title="Confirm Scheduled update deletion?"
      onClose={() => setShowDeleteAlert(false)}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
