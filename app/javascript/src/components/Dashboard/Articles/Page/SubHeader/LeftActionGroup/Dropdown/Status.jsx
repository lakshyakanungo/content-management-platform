import React from "react";

import { Dropdown } from "neetoui";

import articlesApi from "apis/articles";

const Status = ({ selectedArticleIds, refetch, setSelectedArticleIds }) => {
  const { Menu, MenuItem } = Dropdown;

  const handleBulkStatusChange = async status => {
    try {
      await articlesApi.updateMultiple({
        ids: selectedArticleIds,
        payload: { status },
      });
      setSelectedArticleIds([]);
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <Dropdown
      buttonSize="medium"
      buttonStyle="secondary"
      label="Change status"
      strategy="fixed"
    >
      <Menu>
        <MenuItem.Button onClick={() => handleBulkStatusChange("Draft")}>
          Draft
        </MenuItem.Button>
        <MenuItem.Button onClick={() => handleBulkStatusChange("Published")}>
          Publish
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  );
};

export default Status;
