import React from "react";

import TableWrapper from "@bigbinary/neeto-molecules/TableWrapper";
import { Table as NeetoUITable } from "neetoui";
import { includes } from "ramda";

import { usePageStore } from "hooks/zustand/usePageStore";
import { useSelectedArticlesStore } from "hooks/zustand/useSelectedArticlesStore";

import { buildRowClassName } from "./utils";

const Table = ({ articles = [], columnData = [], totalArticlesCount }) => {
  const { currentPageNumber, setCurrentPageNumber } = usePageStore();
  const { selectedArticleIds, setSelectedArticleIds } =
    useSelectedArticlesStore();

  const handleRowSelect = selectedKeysInCurrentPage => {
    const currentPageKeys = articles.map(article => article.id);
    const selectedArticleIdsSet = new Set(selectedArticleIds);
    selectedKeysInCurrentPage.forEach(key => selectedArticleIdsSet.add(key));
    const keysUnselected = currentPageKeys.filter(
      key =>
        !includes(key, selectedKeysInCurrentPage) &&
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
