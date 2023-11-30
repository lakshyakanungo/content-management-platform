import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown, Tooltip } from "neetoui";
import { useTranslation } from "react-i18next";

import { useDeleteRedirection } from "hooks/reactQuery/settings/redirection/useRedirection";

import { URL_TRUNCATE_LENGTH } from "./constants";
import DeleteAlert from "./DeleteAlert";
import { buildFullUrl, FormattedUrl } from "./utils";

const Row = ({ redirection, setEditingRow }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { mutate: deleteRedirection } = useDeleteRedirection();

  const { Menu, MenuItem } = Dropdown;

  const { t } = useTranslation();

  const handleEdit = () => setEditingRow(redirection.id);

  return (
    <div className="neeto-ui-bg-white grid grid-cols-12 gap-4 justify-between p-2 my-2 items-center">
      <Tooltip
        content={buildFullUrl(redirection.from)}
        disabled={buildFullUrl(redirection.from).length < URL_TRUNCATE_LENGTH}
        position="top"
      >
        <div className="col-span-5 mr-4">
          <FormattedUrl url={redirection.from} />
        </div>
      </Tooltip>
      <Tooltip
        content={buildFullUrl(redirection.to)}
        disabled={buildFullUrl(redirection.to).length < URL_TRUNCATE_LENGTH}
        position="top"
      >
        <span className="col-span-5 neeto-ui-text-gray-700">
          <FormattedUrl url={redirection.to} />
        </span>
      </Tooltip>
      <span className="col-span-2 text-right">
        <Dropdown buttonStyle="text" icon={MenuHorizontal}>
          <Menu>
            <MenuItem.Button onClick={handleEdit}>
              {t("dashboard.settings.redirections.row.dropdown.edit")}
            </MenuItem.Button>
            <MenuItem.Button
              style="danger"
              onClick={() => setShowDeleteAlert(true)}
            >
              {t("dashboard.settings.redirections.row.dropdown.delete")}
            </MenuItem.Button>
          </Menu>
        </Dropdown>
      </span>
      <DeleteAlert
        handleDelete={() => deleteRedirection({ redirection })}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
    </div>
  );
};

export default Row;
