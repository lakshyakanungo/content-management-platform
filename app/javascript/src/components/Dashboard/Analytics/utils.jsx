import React from "react";

import { Button } from "@bigbinary/neetoui";
import classNames from "classnames";
import { formatDate } from "utils";

import i18n from "common/i18n";

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
    title: i18n.t("dashboard.analytics.table.title"),
    dataIndex: "title",
    key: "title",
    width: 75,

    render: (_, record) => <Title record={record} />,
  },
  {
    title: i18n.t("dashboard.analytics.table.lastPublishedAt"),
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
    width: 75,
    render: lastPublishedAt => formatDate(lastPublishedAt),
  },
  {
    title: i18n.t("dashboard.analytics.table.category"),
    dataIndex: "categoryName",
    key: "category",
    width: 75,
  },
  {
    title: i18n.t("dashboard.analytics.table.visits"),
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
