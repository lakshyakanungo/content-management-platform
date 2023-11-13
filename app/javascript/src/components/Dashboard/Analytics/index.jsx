import React from "react";

import Header from "@bigbinary/neeto-molecules/Header";
import { Table } from "@bigbinary/neetoui";

const Analytics = () => {
  const columnData = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 75,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 75,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 75,
    },
    {
      title: "Visits",
      dataIndex: "visits",
      key: "visits",
      width: 75,
      sorter: (a, b) => a.visits - b.visits,
    },
  ];

  const rowData = [
    {
      id: 1,
      title: "Some published article title",
      category: "some category",
      date: "some Date",
      visits: "23",
    },
    {
      id: 2,
      title: "Some published article title 2",
      category: "some category",
      date: "some Date",
      visits: "34",
    },
    {
      id: 3,
      title: "Some published article title 3",
      category: "some category",
      date: "some Date",
      visits: "7",
    },

    // Other rows
  ];

  return (
    <div className="p-4">
      <Header className="p-4" title="Analytics" />
      <div>
        <Table className="mx-4" columnData={columnData} rowData={rowData} />
      </div>
    </div>
  );
};

export default Analytics;
