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
  // console.log(articles, "Articles");

  const handleRowSelect = selectedKeysInCurrentPage => {
    const currentPageKeys = articles.map(article => article.id);
    // const keysAlreadySelectedInCurrentPage = currentPageKeys.map(key =>
    //   selectedKeysInCurrentPage.includes(key)
    // );
    // const keysUnselected = currentPageKeys.filter(
    //   key => !keysAlreadySelectedInCurrentPage.includes(key)
    // );

    // const newSelectedKeys = selectedArticleIds.map(key=>{
    //   if(!currentPageKeys.includes(key))return key;
    //   else if(selectedKeysInCurrentPage.includes(key))
    // })
    const selectedArticleIdsSet = new Set(selectedArticleIds);
    selectedKeysInCurrentPage.forEach(key => selectedArticleIdsSet.add(key));

    const keysUnselected = currentPageKeys.filter(
      key =>
        !selectedKeysInCurrentPage.includes(key) &&
        selectedArticleIdsSet.has(key)
    );

    keysUnselected.forEach(key => selectedArticleIdsSet.delete(key));

    // console.log(selectedArticleIdsSet, "selected keys");
    setSelectedArticleIds([...selectedArticleIdsSet]);
  };

  // console.log(selectedArticleIds, "Selected article ids");

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
          // onRowSelect={selectedRowKeys =>
          //   setSelectedArticleIds(selectedRowKeys)
          // }
        />
      </TableWrapper>
    </div>
  );
};

export default Table;
