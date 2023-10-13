import React from "react";

import Columns from "@bigbinary/neeto-molecules/Columns";
import NeetoSubHeader from "@bigbinary/neeto-molecules/SubHeader";
import { Delete } from "neetoicons";
import { Dropdown, Button, Tag } from "neetoui";

import {
  // ARTICLES_TABLE_ROW_DATA,
  ARTICLES_TABLE_COLUMN_DATA,
} from "../constants";

const SubHeader = ({
  selectedArticleIds,
  articles,
  categories,
  setColumns,
  // handleDelete,
  // handleStatusChange,
  handleBulkCategoryChange,
  handleBulkStatusChange,
  handleBulkDelete,
  selectedCategories,
  setSelectedCategories,
}) => {
  const { Menu, MenuItem } = Dropdown;

  const handleTagClose = category => {
    // console.log("working");
    // console.log(selectedCategories);
    const categoriesAfterClose = selectedCategories.filter(
      item => item !== category
    );
    // console.log(categoriesAfterClose, "catgories after close");
    setSelectedCategories(categoriesAfterClose);
  };

  return (
    <NeetoSubHeader
      leftActionBlock={
        <div className="flex gap-x-3 items-center">
          {selectedArticleIds.length ? (
            <div className="flex gap-x-3 items-center	">
              <span>
                <b>{selectedArticleIds.length} articles</b> selected of{" "}
                {articles.length}
              </span>
              <Dropdown
                buttonSize="medium"
                buttonStyle="secondary"
                label="Change category"
              >
                <Menu>
                  {categories.map(category => (
                    // console.log(category);
                    <MenuItem.Button
                      key={category.id}
                      onClick={() =>
                        handleBulkCategoryChange({
                          ids: selectedArticleIds,
                          category_id: category.id,
                        })
                      }
                    >
                      {category.name}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
              <Dropdown
                buttonSize="medium"
                buttonStyle="secondary"
                label="Change status"
              >
                <Menu>
                  <MenuItem.Button
                    onClick={() =>
                      handleBulkStatusChange({
                        ids: selectedArticleIds,
                        status: "Draft",
                      })
                    }
                  >
                    Draft
                  </MenuItem.Button>
                  <MenuItem.Button
                    onClick={() =>
                      handleBulkStatusChange({
                        ids: selectedArticleIds,
                        status: "Published",
                      })
                    }
                  >
                    Publish
                  </MenuItem.Button>
                </Menu>
              </Dropdown>
              <Button
                // disabled={!selectedNoteIds.length}
                icon={Delete}
                label="Delete"
                size="medium"
                style="danger"
                onClick={() => handleBulkDelete(selectedArticleIds)}
              />
            </div>
          ) : (
            <div>{articles.length} articles</div>
          )}
          {selectedCategories.map(category => (
            <Tag
              key={category.id}
              label={category.name}
              onClose={() => handleTagClose(category)}
            />
          ))}
        </div>
      }
      rightActionBlock={
        !selectedArticleIds.length && (
          <Columns
            buttonStyle="secondary"
            // checkboxProps={{}}
            columnData={ARTICLES_TABLE_COLUMN_DATA}
            fixedColumns={["title", "iconButton"]}
            label="Columns"
            // localStorageKey="TABLE_HIDDEN_COLUMNS"
            noColumnMessage="No columns found"
            onChange={setColumns}
            // searchProps={{ placeholder: "Search columns" }}
          />
        )
      }
    />
  );
};

export default SubHeader;
