import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Dropdown as NeetoDropdown } from "neetoui";
// import { useTranslation } from "react-i18next";

const renderDropdown = () => {
  const { Menu, MenuItem, Divider } = NeetoDropdown;

  // const { t } = useTranslation();
  return (
    <div className="flex justify-end	">
      <NeetoDropdown
        appendTo={() => document.body}
        buttonStyle="text"
        icon={() => <MenuHorizontal size={20} />}
        strategy="fixed"
      >
        <Menu>
          <MenuItem.Button>Publish/Unpublish</MenuItem.Button>
          <Divider />
          <MenuItem.Button style="danger">Delete</MenuItem.Button>
        </Menu>
      </NeetoDropdown>
    </div>
  );
};

export const ARTICLES_TABLE_COLUMN_DATA = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Last Published At",
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "",
    dataIndex: "iconButton",
    key: "iconButton",
    // width: "5%",
    // fixed: "right",
    render: renderDropdown,
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
