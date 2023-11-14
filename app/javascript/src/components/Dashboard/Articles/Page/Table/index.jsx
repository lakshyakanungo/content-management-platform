import React from "react";

import TableWrapper from "@bigbinary/neeto-molecules/TableWrapper";
import { Table as NeetoUITable } from "neetoui";

import { buildRowClassName } from "./utils";

const Table = ({
  selectedArticleIds,
  setSelectedArticleIds,
  articles = [],
  columnData = [],
  currentPageNumber,
  setCurrentPageNumber,
  totalArticlesCount,
}) => {
  const handleRowSelect = selectedKeysInCurrentPage => {
    const currentPageKeys = articles.map(article => article.id);
    const selectedArticleIdsSet = new Set(selectedArticleIds);
    selectedKeysInCurrentPage.forEach(key => selectedArticleIdsSet.add(key));
    const keysUnselected = currentPageKeys.filter(
      key =>
        !selectedKeysInCurrentPage.includes(key) &&
        selectedArticleIdsSet.has(key)
    );
    keysUnselected.forEach(key => selectedArticleIdsSet.delete(key));
    setSelectedArticleIds([...selectedArticleIdsSet]);
  };

  return (
    <div className="notes-table-height w-11/12 justify-center">
      <TableWrapper>
        <NeetoUITable
          allowRowClick
          rowSelection
          bordered={false}
          columnData={columnData}
          currentPageNumber={currentPageNumber}
          defaultPageSize={9}
          handlePageChange={page => setCurrentPageNumber(page)}
          rowClassName={buildRowClassName}
          rowData={articles}
          selectedRowKeys={selectedArticleIds}
          totalCount={totalArticlesCount}
          onRowSelect={handleRowSelect}
        />
      </TableWrapper>
    </div>
  );
};

export default Table;
