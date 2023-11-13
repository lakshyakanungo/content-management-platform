import React from "react";

import { Button } from "@bigbinary/neetoui";
import classNames from "classnames";

import { formatDate } from "../Articles/Page/Table/utils";

const Title = ({ record }) => {
  const handleClick = () => window.open(`/eui/${record.slug}`, "_blank");

  return (
    <Button className="text-left" style="link" onClick={handleClick}>
      {record.title}
    </Button>
  );
};

export const buildColumnData = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 75,

    render: (_, record) => <Title record={record} />,
  },
  {
    title: "Last published at",
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
    width: 75,
    render: lastPublishedAt => formatDate(lastPublishedAt),
  },
  {
    title: "Category",
    dataIndex: "categoryName",
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

export const buildRowClassName = (_, index) =>
  classNames({
    "neeto-ui-bg-gray-100": index % 2,
  });

// const rowData = [
//   {
//     id: 1,
//     title: "Some published article title",
//     category: "some category",
//     date: "some Date",
//     visits: "23",
//   },
//   {
//     id: 2,
//     title: "Some published article title 2",
//     category: "some category",
//     date: "some Date",
//     visits: "34",
//   },
//   {
//     id: 3,
//     title: "Some published article title 3",
//     category: "some category",
//     date: "some Date",
//     visits: "7",
//   },

//   // Other rows
// ];
