import React from "react";

import classNames from "classnames";
import dayjs from "dayjs";
import { Button } from "neetoui";

import Dropdown from "./Dropdown";

// import { useTranslation } from "react-i18next";

const renderTitle = ({ record, setClickedArticle, setShowEditArticle }) => {
  const handleClick = () => {
    setClickedArticle(record);
    setShowEditArticle(true);
  };

  return (
    <Button style="link" onClick={handleClick}>
      {record.title}
    </Button>
  );
};

const renderLastPublishedAt = date => (
  <span>{date ? formatDate(date) : "-"}</span>
);

export const buildArticlesColumnData = ({
  handleStatusChange,
  handleDelete,
  setClickedArticle,
  setShowEditArticle,
}) => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (_, record) =>
      renderTitle({ record, setClickedArticle, setShowEditArticle }),
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: "Category",
    dataIndex: "category_name",
    key: "category",
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: "Last Published At",
    dataIndex: "last_published_at",
    key: "lastPublishedAt",
    ellipsis: {
      showTitle: true,
    },
    render: renderLastPublishedAt,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: "",
    dataIndex: "iconButton",
    key: "iconButton",
    render: (_, record) => (
      <Dropdown
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
        record={record}
      />
    ),
  },
];

export const formatDate = date => dayjs(date).format("MMM D, YYYY, h:mm A");

export const buildRowClassName = (_, index) =>
  classNames({
    "neeto-ui-bg-gray-100": index % 2,
  });
