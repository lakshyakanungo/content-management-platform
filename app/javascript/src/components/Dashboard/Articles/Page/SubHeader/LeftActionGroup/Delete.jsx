import React from "react";

import { Delete as DeleteIcon } from "neetoicons";
import { Button } from "neetoui";

import articlesApi from "apis/articles";

const Delete = ({ selectedArticleIds, refetch, setSelectedArticleIds }) => {
  const handleBulkDelete = async ids => {
    try {
      await articlesApi.deleteMultiple(ids);
      setSelectedArticleIds([]);
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <Button
      icon={DeleteIcon}
      label="Delete"
      size="medium"
      style="danger"
      onClick={() => handleBulkDelete(selectedArticleIds)}
    />
  );
};

export default Delete;
