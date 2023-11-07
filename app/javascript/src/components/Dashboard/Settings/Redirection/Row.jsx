import React from "react";

import { truncate } from "@bigbinary/neeto-commons-frontend/pure";
import { MenuHorizontal } from "neetoicons";
import { Dropdown, Tooltip } from "neetoui";
import { useTranslation } from "react-i18next";

import redirectionsApi from "apis/redirections";

import {
  FROM_PATH_TRUNCATE_LENGTH,
  TO_PATH_TRUNCATE_LENGTH,
} from "./constants";

const Row = ({ redirection, setEditingRow, fetchRedirections }) => {
  const { Menu, MenuItem } = Dropdown;

  const { t } = useTranslation();

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
    <div className="neeto-ui-bg-white grid grid-cols-12 gap-4 justify-between p-2 my-2 items-center">
      <Tooltip
        content={redirection.from}
        disabled={redirection.from.length < FROM_PATH_TRUNCATE_LENGTH}
        position="top"
      >
        <div className="col-span-5 mr-4">
          {truncate(redirection.from, FROM_PATH_TRUNCATE_LENGTH)}
        </div>
      </Tooltip>
      <Tooltip
        content={redirection.to}
        disabled={redirection.to.length < TO_PATH_TRUNCATE_LENGTH}
        position="top"
      >
        <span className="col-span-5 neeto-ui-text-gray-700">
          {truncate(redirection.to, TO_PATH_TRUNCATE_LENGTH)}
        </span>
      </Tooltip>
      <span className="col-span-2 text-right">
        <Dropdown buttonStyle="text" icon={MenuHorizontal}>
          <Menu>
            <MenuItem.Button onClick={handleEdit}>
              {t("dashboard.settings.redirections.row.dropdown.edit")}
            </MenuItem.Button>
            <MenuItem.Button style="danger" onClick={handleDelete}>
              {t("dashboard.settings.redirections.row.dropdown.delete")}
            </MenuItem.Button>
          </Menu>
        </Dropdown>
      </span>
    </div>
  );
};

export default Row;
