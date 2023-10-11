import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown } from "neetoui";

const Row = ({ redirection, setEditingRow }) => {
  const { Menu, MenuItem } = Dropdown;

  const handleEdit = () => {
    setEditingRow(redirection.id);
  };

  return (
    <div className="neeto-ui-bg-white grid grid-cols-12 justify-between gap-2 p-2 mt-2 items-center">
      <span className="col-span-5">{redirection.from}</span>
      <span className="col-span-5">{redirection.to}</span>
      <span className="col-span-2 text-right">
        <Dropdown
          // buttonSize="medium"
          buttonStyle="text"
          icon={MenuHorizontal}
          // label="Change category"
        >
          <Menu>
            <MenuItem.Button onClick={handleEdit}>Edit</MenuItem.Button>
            <MenuItem.Button style="danger">Delete</MenuItem.Button>
          </Menu>
        </Dropdown>
      </span>
    </div>
  );
};

export default Row;
