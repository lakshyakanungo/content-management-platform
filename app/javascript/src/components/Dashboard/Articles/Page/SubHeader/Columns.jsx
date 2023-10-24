import React from "react";

import NeetoColumns from "@bigbinary/neeto-molecules/Columns";

const Columns = ({ columns, setAllowedTableColumns }) => (
  <NeetoColumns
    buttonStyle="secondary"
    columnData={columns}
    fixedColumns={["title", "iconButton"]}
    label="Columns"
    localStorageKey="TABLE_HIDDEN_COLUMNS"
    noColumnMessage="No columns found"
    onChange={cols => setAllowedTableColumns(cols)}
  />
);

export default Columns;
