import React, { useContext } from "react";

import TableWrapper from "@bigbinary/neeto-molecules/TableWrapper";
import { Table as NeetoUITable } from "neetoui";

import { buildRowClassName } from "./utils";

import { PageContext, SelectedArticlesContext } from "../..";

const Table = ({ articles = [], columnData = [], totalArticlesCount }) => {
  const { currentPageNumber, setCurrentPageNumber } = useContext(PageContext);
  const { selectedArticleIds, setSelectedArticleIds } = useContext(
    SelectedArticlesContext
  );

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
  );
};

export default Table;
