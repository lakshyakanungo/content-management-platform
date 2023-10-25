import React from "react";

import NeetoColumns from "neetomolecules/Columns";

const Columns = ({ columns, setVisibleTableColumns }) => (
  <NeetoColumns
    buttonStyle="secondary"
    columnData={columns}
    fixedColumns={["title", "iconButton"]}
    label="Columns"
    localStorageKey="TABLE_HIDDEN_COLUMNS"
    noColumnMessage="No columns found"
    onChange={cols => setVisibleTableColumns(cols)}
  />
);

export default Columns;
