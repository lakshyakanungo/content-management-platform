import React from "react";

import { MenuVertical } from "neetoicons";
import { Dropdown as NeetoDropdown } from "neetoui";
import { useTranslation } from "react-i18next";

const Dropdown = ({ setShowEditModal, setShowDeleteOverlay }) => {
  const { Menu, MenuItem, Divider } = NeetoDropdown;

  const { t } = useTranslation();

  return (
    <NeetoDropdown
      buttonProps={{ className: "neeto-ui-text-gray-500" }}
      buttonStyle="text"
      icon={MenuVertical}
    >
      <Menu>
        <MenuItem.Button onClick={() => setShowEditModal(true)}>
          {t("dashboard.settings.categories.listItem.dropdown.edit")}
        </MenuItem.Button>
        <Divider />
        <MenuItem.Button
          style="danger"
          onClick={() => setShowDeleteOverlay(true)}
        >
          {t("dashboard.settings.categories.listItem.dropdown.delete")}
        </MenuItem.Button>
      </Menu>
    </NeetoDropdown>
  );
};

export default Dropdown;
