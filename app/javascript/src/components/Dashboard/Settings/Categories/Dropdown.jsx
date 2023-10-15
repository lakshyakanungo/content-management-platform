import React from "react";

import { Dropdown as NeetoDropdown } from "@bigbinary/neetoui";
import { MenuVertical } from "neetoicons";

const Dropdown = ({ setShowEditCategoryModal, handleDelete }) => {
  const { Menu, MenuItem, Divider } = NeetoDropdown;

  return (
    <NeetoDropdown
      buttonProps={{ className: "neeto-ui-text-gray-500" }}
      buttonStyle="text"
      icon={MenuVertical}
    >
      <Menu>
        <MenuItem.Button onClick={() => setShowEditCategoryModal(true)}>
          Edit
        </MenuItem.Button>
        <Divider />
        <MenuItem.Button
          style="danger"
          // onClick={() => handleDelete(id)}
          onClick={handleDelete}
        >
          Delete
        </MenuItem.Button>
      </Menu>
    </NeetoDropdown>
  );
};

export default Dropdown;
