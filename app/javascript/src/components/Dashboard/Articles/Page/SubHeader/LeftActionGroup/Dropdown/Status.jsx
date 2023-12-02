import React from "react";

import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import { useBulkStatusChange } from "hooks/reactQuery/articles/page/useBulkUpdate";
import { useSelectedArticlesStore } from "hooks/zustand/useSelectedArticlesStore";

const Status = () => {
  const { selectedArticleIds, setSelectedArticleIds } =
    useSelectedArticlesStore();

  const { mutate: updateBulkStatus } = useBulkStatusChange({
    onSuccess: () => setSelectedArticleIds([]),
  });

  const { Menu, MenuItem } = Dropdown;

  const { t } = useTranslation();

  const handleClick = status =>
    updateBulkStatus({
      ids: selectedArticleIds,
      payload: { status },
    });

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
        <MenuItem.Button onClick={() => handleClick("draft")}>
          {t("dashboard.articles.page.subheader.leftActionGroup.status.draft")}
        </MenuItem.Button>
        <MenuItem.Button onClick={() => handleClick("published")}>
          {t(
            "dashboard.articles.page.subheader.leftActionGroup.status.publish"
          )}
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  );
};

export default Status;
