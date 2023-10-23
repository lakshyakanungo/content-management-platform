import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown as NeetoDropdown, Button } from "neetoui";

import { formatDate } from "./utils";

// import { useTranslation } from "react-i18next";

const renderDropdown = ({ record, handleStatusChange, handleDelete }) => {
  const { Menu, MenuItem, Divider } = NeetoDropdown;

  const { id, status } = record;

  // const { t } = useTranslation();
  return (
    // <div className="flex justify-end	">
    <NeetoDropdown
      appendTo={() => document.body}
      buttonStyle="text"
      className="w-6"
      icon={() => <MenuHorizontal size={20} />}
      strategy="fixed"
    >
      <Menu>
        {status === "Draft" ? (
          <MenuItem.Button
            onClick={() => handleStatusChange({ id, status: "Published" })}
          >
            Publish
          </MenuItem.Button>
        ) : (
          <MenuItem.Button
            onClick={() => handleStatusChange({ id, status: "Draft" })}
          >
            Unpublish
          </MenuItem.Button>
        )}
        <Divider />
        <MenuItem.Button style="danger" onClick={() => handleDelete(id)}>
          Delete
        </MenuItem.Button>
      </Menu>
    </NeetoDropdown>
    // </div>
  );
};

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
    width: "10%",
  },
  {
    title: "Category",
    dataIndex: "category_name",
    key: "category",
    ellipsis: {
      showTitle: true,
    },
    width: "5%",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    ellipsis: {
      showTitle: true,
    },
    width: "5%",
  },
  {
    title: "Last Published At",
    dataIndex: "last_published_at",
    key: "lastPublishedAt",
    ellipsis: {
      showTitle: true,
    },
    width: "10%",
    render: renderLastPublishedAt,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: {
      showTitle: true,
    },
    width: "5%",
  },
  {
    title: "",
    dataIndex: "iconButton",
    key: "iconButton",
    render: (_, record) =>
      renderDropdown({ record, handleStatusChange, handleDelete }),

    fixed: "right",
    // width: 5,
  },
];

export const ARTICLES_TABLE_COLUMN_DATA = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    ellipsis: {
      showTitle: false,
    },
    // width: 75,
  },
  {
    title: "Category",
    dataIndex: "category_name",
    key: "category",
    ellipsis: {
      showTitle: false,
    },
    // width: 75,
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    ellipsis: {
      showTitle: false,
    },
    // width: 75,
  },
  {
    title: "Last Published At",
    dataIndex: "last_published_at",
    key: "lastPublishedAt",
    ellipsis: {
      showTitle: false,
    },
    // width: 75,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: {
      showTitle: false,
    },
    // width: 75,
  },
  {
    title: "",
    dataIndex: "icon_button",
    key: "iconButton",
    ellipsis: {
      showTitle: false,
    },
    // width: 75,
    // render: () => <div>hi</div>,
  },
];

export const ARTICLES_TABLE_ROW_DATA = [
  {
    id: 1,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 2,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 3,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 4,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 5,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 6,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 7,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 8,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 9,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 9,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
  {
    id: 10,
    title: "Welcome to scribble",
    category: "Front End Articles",
    author: "Oliver Smith",
    lastPublishedAt: "Jul 13, 2022, 11:13 AM",
    status: "Draft",
  },
];
