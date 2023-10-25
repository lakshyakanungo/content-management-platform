import React, { useState } from "react";

import TableWrapper from "@bigbinary/neeto-molecules/TableWrapper";
import { Table as NeetoUITable } from "neetoui";

import { buildRowClassName } from "./utils";

const Table = ({
  selectedArticleIds,
  setSelectedArticleIds,
  articles = [],
  columnData = [],
}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  return (
    <div className="notes-table-height w-11/12 justify-center">
      <TableWrapper>
        <NeetoUITable
          allowRowClick
          preserveTableStateInQuery
          rowSelection
          bordered={false}
          columnData={columnData}
          currentPageNumber={currentPageNumber}
          defaultPageSize={9}
          handlePageChange={page => setCurrentPageNumber(page)}
          rowClassName={buildRowClassName}
          rowData={articles}
          selectedRowKeys={selectedArticleIds}
          onRowSelect={selectedRowKeys =>
            setSelectedArticleIds(selectedRowKeys)
          }
        />
      </TableWrapper>
    </div>
  );
};

export default Table;
