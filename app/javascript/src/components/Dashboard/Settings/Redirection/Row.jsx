import React from "react";

import { truncate } from "@bigbinary/neeto-commons-frontend/pure";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Tooltip } from "neetoui";

import redirectionsApi from "apis/redirections";

import { TRUNCATE_LENGTH } from "./constants";

const Row = ({ redirection, setEditingRow, fetchRedirections }) => {
  const { Menu, MenuItem } = Dropdown;

  const handleEdit = () => setEditingRow(redirection.id);

  const handleDelete = async () => {
    try {
      await redirectionsApi.destroy(redirection.id);
      fetchRedirections();
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <div className="neeto-ui-bg-white grid grid-cols-12 justify-between gap-2 p-2 mt-2 items-center">
      <Tooltip
        content={redirection.from}
        disabled={redirection.from.length < TRUNCATE_LENGTH}
        position="top"
      >
        <span className="col-span-5">
          {truncate(redirection.from, TRUNCATE_LENGTH)}
        </span>
      </Tooltip>
      <Tooltip
        content={redirection.to}
        disabled={redirection.to.length < TRUNCATE_LENGTH}
        position="top"
      >
        <span className="col-span-5">
          {truncate(redirection.to, TRUNCATE_LENGTH)}
        </span>
      </Tooltip>
      <span className="col-span-2 text-right">
        <Dropdown buttonStyle="text" icon={MenuHorizontal}>
          <Menu>
            <MenuItem.Button onClick={handleEdit}>Edit</MenuItem.Button>
            <MenuItem.Button style="danger" onClick={handleDelete}>
              Delete
            </MenuItem.Button>
          </Menu>
        </Dropdown>
      </span>
    </div>
  );
};

export default Row;
