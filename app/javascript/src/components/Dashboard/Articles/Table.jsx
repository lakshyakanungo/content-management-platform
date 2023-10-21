import React, { useState } from "react";

import classnames from "classnames";
import { Table as NeetoUITable } from "neetoui";

// import EditNotePane from "./Pane/Edit";

const Table = ({
  selectedArticleIds,
  setSelectedArticleIds,
  articles = [],
  columnData = [],
  // fetchArticles,
  // setShowEditArticle,
  // setClickedArticle,
}) => {
  // const [showEditArticle, setShowEditArticle] = useState(false);
  // const [selectedArticle, setSelectedArticle] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const buildRowClassName = (_, index) =>
    classnames({
      "neeto-ui-bg-gray-100": index % 2,
    });

  // console.log("column data", columnData);

  return (
    <div className="notes-table-height flex-shrink flex">
      <NeetoUITable
        allowRowClick
        preserveTableStateInQuery
        rowSelection
        bordered={false}
        className="flex-shrink"
        columnData={columnData}
        currentPageNumber={currentPageNumber}
        defaultPageSize={10}
        handlePageChange={page => setCurrentPageNumber(page)}
        rowClassName={buildRowClassName}
        rowData={articles}
        selectedRowKeys={selectedArticleIds}
        onRowSelect={selectedRowKeys => setSelectedArticleIds(selectedRowKeys)}
        // columnData={ARTICLES_TABLE_COLUMN_DATA}
        // rowData={ARTICLES_TABLE_ROW_DATA}

        // onRowClick={(_, article) => {
        // setClickedArticle(article);
        // setShowEditArticle(true);
        // }}
      />
    </div>
  );
};

export default Table;
