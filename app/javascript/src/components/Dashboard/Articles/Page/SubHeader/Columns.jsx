import React from "react";

import { useTranslation } from "react-i18next";

import NeetoColumns from "neetomolecules/Columns";

const Columns = ({ columns, setVisibleTableColumns }) => {
  const { t } = useTranslation();

  return (
    <NeetoColumns
      buttonStyle="secondary"
      columnData={columns}
      fixedColumns={["title", "iconButton"]}
      label={t("dashboard.articles.page.subheader.columns.label")}
      localStorageKey="TABLE_HIDDEN_COLUMNS"
      noColumnMessage={t("dashboard.articles.page.subheader.columns.empty")}
      onChange={cols => setVisibleTableColumns(cols)}
    />
  );
};

export default Columns;
