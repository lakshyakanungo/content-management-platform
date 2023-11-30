import React from "react";

import { Button } from "@bigbinary/neetoui";
import classNames from "classnames";
import { formatDate } from "utils";

import i18n from "common/i18n";

import { PDF_FILENAME } from "./constants";

const Title = ({ record }) => {
  const handleClick = () => window.open(`/eui/${record.slug}`, "_blank");

  return (
    <Button className="text-left" style="link" onClick={handleClick}>
      {record.title}
    </Button>
  );
};

const base64ToArrayBuffer = data => {
  const binaryString = window.atob(data);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }

  return bytes;
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

export const savePdf = base64Data => {
  const arrBuffer = base64ToArrayBuffer(base64Data);
  const newBlob = new Blob([arrBuffer], { type: "application/pdf" });

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);

    return;
  }
  const data = window.URL.createObjectURL(newBlob);
  const link = document.createElement("a");
  document.body.appendChild(link);
  link.href = data;
  link.download = PDF_FILENAME;
  link.click();
  window.URL.revokeObjectURL(data);
  link.remove();
};
