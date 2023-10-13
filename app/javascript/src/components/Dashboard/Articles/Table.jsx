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
}) => {
  // const [showEditNote, setShowEditNote] = useState(false);
  // const [selectedNote, setSelectedNote] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const buildRowClassName = (_, index) =>
    classnames({
      "neeto-ui-bg-gray-100": index % 2,
    });

  // console.log(selectedArticleIds);

  return (
    <>
      <div className="notes-table-height w-full">
        <NeetoUITable
          allowRowClick
          preserveTableStateInQuery
          rowSelection
          bordered={false}
          columnData={columnData}
          currentPageNumber={currentPageNumber}
          defaultPageSize={10}
          handlePageChange={page => setCurrentPageNumber(page)}
          rowClassName={buildRowClassName}
          rowData={articles}
          selectedRowKeys={selectedArticleIds}
          onRowSelect={selectedRowKeys =>
            setSelectedArticleIds(selectedRowKeys)
          }
          // onRowClick={(_, note) => {
          //   setSelectedNote(note);
          //   setShowEditNote(true);
          // }}
          // scroll={{
          //   x: "110%",
          // }}
        />
      </div>
      {/* <EditNotePane
        fetchNotes={fetchNotes}
        note={selectedNote}
        setShowPane={setShowEditNote}
        showPane={showEditNote}
      /> */}
    </>
  );
};

export default Table;
