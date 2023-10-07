import React from "react";

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

  const buildRowClassName = (_, index) =>
    classnames({
      "neeto-ui-bg-gray-100": index % 2,
    });

  return (
    <>
      <div className="notes-table-height w-full">
        <NeetoUITable
          allowRowClick
          rowSelection
          bordered={false}
          columnData={columnData}
          defaultPageSize={6}
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
