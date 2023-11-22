import React, { useContext, useState } from "react";

import { t } from "i18next";
import { Delete as DeleteIcon } from "neetoicons";
import { Button } from "neetoui";

import articlesApi from "apis/articles";
import {
  PageContext,
  SelectedArticlesContext,
} from "components/Dashboard/Articles";

import Alert from "./Alert";

const Delete = () => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { refetch } = useContext(PageContext);
  const { selectedArticleIds, setSelectedArticleIds } = useContext(
    SelectedArticlesContext
  );

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
