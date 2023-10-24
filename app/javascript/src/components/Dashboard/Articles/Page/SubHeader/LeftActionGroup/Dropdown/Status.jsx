import React from "react";

import { Dropdown } from "neetoui";

const Status = ({ handleBulkStatusChange, selectedArticleIds }) => {
  const { Menu, MenuItem } = Dropdown;

  return (
    <Dropdown
      buttonSize="medium"
      buttonStyle="secondary"
      label="Change status"
      strategy="fixed"
    >
      <Menu>
        <MenuItem.Button
          onClick={() =>
            handleBulkStatusChange({
              ids: selectedArticleIds,
              status: "Draft",
            })
          }
        >
          Draft
        </MenuItem.Button>
        <MenuItem.Button
          onClick={() =>
            handleBulkStatusChange({
              ids: selectedArticleIds,
              status: "Published",
            })
          }
        >
          Publish
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  );
};

export default Status;
