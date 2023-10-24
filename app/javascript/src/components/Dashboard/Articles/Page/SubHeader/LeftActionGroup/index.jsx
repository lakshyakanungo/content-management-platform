import React from "react";

import DeleteArticleButton from "./Delete";
import {
  Category as ChangeCategoryDropdown,
  Status as ChangeStatusDropdown,
} from "./Dropdown";

const LeftActionGroup = ({
  articles,
  categories,
  handleBulkCategoryChange,
  handleBulkStatusChange,
  handleBulkDelete,
  selectedArticleIds,
}) => (
  <div className="flex gap-x-3 items-center	">
    <span>
      <b>{selectedArticleIds.length} articles</b> selected of&nbsp;
      {articles.length}
    </span>
    <ChangeCategoryDropdown
      categories={categories}
      handleBulkCategoryChange={handleBulkCategoryChange}
      selectedArticleIds={selectedArticleIds}
    />
    <ChangeStatusDropdown
      handleBulkStatusChange={handleBulkStatusChange}
      selectedArticleIds={selectedArticleIds}
    />
    <DeleteArticleButton
      handleBulkDelete={handleBulkDelete}
      selectedArticleIds={selectedArticleIds}
    />
  </div>
);

export default LeftActionGroup;
