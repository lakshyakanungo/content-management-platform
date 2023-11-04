import React from "react";

import { t } from "i18next";
import { Delete as DeleteIcon } from "neetoicons";
import { Button } from "neetoui";

import articlesApi from "apis/articles";

const Delete = ({ selectedArticleIds, refetch, setSelectedArticleIds }) => {
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
    <Button
      icon={DeleteIcon}
      size="medium"
      style="danger"
      label={t(
        "dashboard.articles.page.subheader.leftActionGroup.deleteButtonLabel"
      )}
      onClick={() => handleBulkDelete(selectedArticleIds)}
    />
  );
};

export default Delete;
