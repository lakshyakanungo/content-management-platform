import React, { useContext } from "react";

import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import { PageContext } from "components/Dashboard/Articles";
import { useBulkStatusChange } from "hooks/reactQuery/articles/page/useBulkUpdate";
import { useSelectedArticlesStore } from "hooks/zustand/useSelectedArticlesStore";

const Status = () => {
  const { refetch } = useContext(PageContext);
  const { selectedArticleIds, setSelectedArticleIds } =
    useSelectedArticlesStore();

  const { mutate: handleBulkStatusChange } = useBulkStatusChange({
    refetch,
    setSelectedArticleIds,
  });

  const { Menu, MenuItem } = Dropdown;

  const { t } = useTranslation();

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
        <MenuItem.Button
          onClick={() =>
            handleBulkStatusChange({ status: "draft", selectedArticleIds })
          }
        >
          {t("dashboard.articles.page.subheader.leftActionGroup.status.draft")}
        </MenuItem.Button>
        <MenuItem.Button
          onClick={() =>
            handleBulkStatusChange({ status: "published", selectedArticleIds })
          }
        >
          {t(
            "dashboard.articles.page.subheader.leftActionGroup.status.publish"
          )}
        </MenuItem.Button>
      </Menu>
    </Dropdown>
  );
};

export default Status;
