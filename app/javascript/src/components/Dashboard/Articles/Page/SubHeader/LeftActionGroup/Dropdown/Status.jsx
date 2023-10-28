import React from "react";

import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";

const Status = ({ selectedArticleIds, refetch, setSelectedArticleIds }) => {
  const { Menu, MenuItem } = Dropdown;

  const { t } = useTranslation();

  const handleBulkStatusChange = async status => {
    try {
      await articlesApi.updateMultiple({
        ids: selectedArticleIds,
        payload: { status },
      });
      setSelectedArticleIds([]);
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <Dropdown
      buttonSize="medium"
      buttonStyle="secondary"
      strategy="fixed"
      label={t(
        "dashboard.articles.page.subheader.leftActionGroup.status.dropdownLabel"
      )}
    >
      <Menu>
        <MenuItem.Button onClick={() => handleBulkStatusChange("Draft")}>
          {t("dashboard.articles.page.subheader.leftActionGroup.status.draft")}
        </MenuItem.Button>
        <MenuItem.Button onClick={() => handleBulkStatusChange("Published")}>
          {t(
            "dashboard.articles.page.subheader.leftActionGroup.status.publish"
          )}
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  );
};

export default Status;
