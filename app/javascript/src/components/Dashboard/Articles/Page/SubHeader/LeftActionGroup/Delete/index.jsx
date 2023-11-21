import React, { useState } from "react";

import { t } from "i18next";
import { Delete as DeleteIcon } from "neetoicons";
import { Button } from "neetoui";

import articlesApi from "apis/articles";

import Alert from "./Alert";

const Delete = ({ selectedArticleIds, refetch, setSelectedArticleIds }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleBulkDelete = async ids => {
    try {
      await articlesApi.bulkDelete(ids);
      setSelectedArticleIds([]);
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <>
      <Button
        icon={DeleteIcon}
        size="medium"
        style="danger"
        label={t(
          "dashboard.articles.page.subheader.leftActionGroup.deleteButtonLabel"
        )}
        onClick={() => setShowDeleteAlert(true)}
      />
      <Alert
        handleBulkDelete={handleBulkDelete}
        selectedArticleIds={selectedArticleIds}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
    </>
  );
};

export default Delete;
