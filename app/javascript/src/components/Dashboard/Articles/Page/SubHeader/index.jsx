import React, { useMemo } from "react";

import NeetoSubHeader from "@bigbinary/neeto-molecules/SubHeader";
import { Tag } from "@bigbinary/neetoui";

import Columns from "./Columns";
import LeftActionGroup from "./LeftActionGroup";

import { buildArticlesColumnData } from "../../constants";

const SubHeader = ({
  selectedArticleIds,
  articles,
  categories,
  handleDelete,
  handleStatusChange,
  handleBulkCategoryChange,
  handleBulkStatusChange,
  handleBulkDelete,
  selectedCategories,
  setSelectedCategories,
  setAllowedTableColumns,
  setClickedArticle,
  setShowEditArticle,
}) => {
  const columns = useMemo(
    () =>
      buildArticlesColumnData({
        handleStatusChange,
        handleDelete,
        setClickedArticle,
        setShowEditArticle,
      }),
    []
  );

  // console.log(columns, "columns");

  // console.log(allowedColumns, "allowed ");
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
      className="w-11/12"
      leftActionBlock={
        <div className="flex gap-x-3 items-center">
          {selectedArticleIds.length ? (
            <LeftActionGroup
              articles={articles}
              categories={categories}
              handleBulkCategoryChange={handleBulkCategoryChange}
              handleBulkDelete={handleBulkDelete}
              handleBulkStatusChange={handleBulkStatusChange}
              selectedArticleIds={selectedArticleIds}
            />
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
            columns={columns}
            setAllowedTableColumns={setAllowedTableColumns}
          />
        )
      }
    />
  );
};

export default SubHeader;
