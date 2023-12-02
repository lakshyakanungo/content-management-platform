import React, { useState } from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown as NeetoDropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import DeleteAlert from "./DeleteAlert";

const Dropdown = ({ record, handleStatusChange, handleDelete }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { t } = useTranslation();

  const { Menu, MenuItem, Divider } = NeetoDropdown;

  const { id, status } = record;

  const handleStatusClick = status =>
    handleStatusChange({
      id,
      payload: { status },
    });

  return (
    <>
      <NeetoDropdown
        appendTo={() => document.body}
        buttonStyle="text"
        className="w-6"
        icon={() => <MenuHorizontal size={20} />}
        strategy="fixed"
      >
        <Menu>
          {status === "draft" ? (
            <MenuItem.Button onClick={() => handleStatusClick("published")}>
              {t("dashboard.articles.page.table.dropdown.publish")}
            </MenuItem.Button>
          ) : (
            <MenuItem.Button onClick={() => handleStatusClick("draft")}>
              {t("dashboard.articles.page.table.dropdown.unpublish")}
            </MenuItem.Button>
          )}
          <Divider />
          <MenuItem.Button
            style="danger"
            onClick={() => setShowDeleteAlert(true)}
          >
            {t("dashboard.articles.page.table.dropdown.delete")}
          </MenuItem.Button>
        </Menu>
      </NeetoDropdown>
      <DeleteAlert
        handleDelete={handleDelete}
        record={record}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
    </>
  );
};

export default Dropdown;
