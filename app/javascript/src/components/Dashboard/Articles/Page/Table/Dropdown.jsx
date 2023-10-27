import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown as NeetoDropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const Dropdown = ({ record, handleStatusChange, handleDelete }) => {
  const { id, status } = record;

  const { Menu, MenuItem, Divider } = NeetoDropdown;

  const { t } = useTranslation();

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
            {t("dashboard.articles.page.table.dropdown.publish")}
          </MenuItem.Button>
        ) : (
          <MenuItem.Button
            onClick={() => handleStatusChange({ id, status: "Draft" })}
          >
            {t("dashboard.articles.page.table.dropdown.unpublish")}
          </MenuItem.Button>
        )}
        <Divider />
        <MenuItem.Button style="danger" onClick={() => handleDelete(id)}>
          {t("dashboard.articles.page.table.dropdown.delete")}
        </MenuItem.Button>
      </Menu>
    </NeetoDropdown>
  );
};

export default Dropdown;
