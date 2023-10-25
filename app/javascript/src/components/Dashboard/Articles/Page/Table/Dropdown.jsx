import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown as NeetoDropdown } from "neetoui";

const Dropdown = ({ record, handleStatusChange, handleDelete }) => {
  const { id, status } = record;

  const { Menu, MenuItem, Divider } = NeetoDropdown;

  return (
    <NeetoDropdown
      appendTo={() => document.body}
      buttonStyle="text"
      className="w-6"
      icon={() => <MenuHorizontal size={20} />}
      strategy="fixed"
    >
      <Menu>
        {status === "Draft" ? (
          <MenuItem.Button
            onClick={() => handleStatusChange({ id, status: "Published" })}
          >
            Publish
          </MenuItem.Button>
        ) : (
          <MenuItem.Button
            onClick={() => handleStatusChange({ id, status: "Draft" })}
          >
            Unpublish
          </MenuItem.Button>
        )}
        <Divider />
        <MenuItem.Button style="danger" onClick={() => handleDelete(id)}>
          Delete
        </MenuItem.Button>
      </Menu>
    </NeetoDropdown>
  );
};

export default Dropdown;
