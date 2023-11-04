import React from "react";

import classNames from "classnames";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button } from "neetoui";
import { useHistory } from "react-router-dom";

import Dropdown from "./Dropdown";

const Title = ({ record }) => {
  const history = useHistory();

  const handleClick = () => history.push(`/articles/edit/${record.id}`);

  return (
    <Button style="link" onClick={handleClick}>
      {record.title}
    </Button>
  );
};

const renderLastPublishedAt = date => (
  <span>{date ? formatDate(date) : "-"}</span>
);

const renderStatus = status => <span className="capitalize">{status}</span>;

export const buildArticlesColumnData = ({
  handleStatusChange,
  handleDelete,
}) => [
  {
    title: t("dashboard.articles.page.table.title"),
    dataIndex: "title",
    key: "title",
    render: (_, record) => <Title record={record} />,
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: t("dashboard.articles.page.table.category"),
    dataIndex: "categoryName",
    key: "category",
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: t("dashboard.articles.page.table.author"),
    dataIndex: "author",
    key: "author",
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: t("dashboard.articles.page.table.lastPublishedAt"),
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
    ellipsis: {
      showTitle: true,
    },
    render: renderLastPublishedAt,
  },
  {
    title: t("dashboard.articles.page.table.status"),
    dataIndex: "status",
    key: "status",
    ellipsis: {
      showTitle: true,
    },
    render: renderStatus,
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
