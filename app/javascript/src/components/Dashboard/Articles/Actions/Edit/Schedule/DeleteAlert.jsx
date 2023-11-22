import React from "react";

import { Alert } from "@bigbinary/neetoui";

const DeleteAlert = ({ showDeleteAlert, setShowDeleteAlert }) => {
  const handleDelete = () => {};

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
