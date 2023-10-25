import React from "react";

import DeleteArticleButton from "./Delete";
import {
  Category as ChangeCategoryDropdown,
  Status as ChangeStatusDropdown,
} from "./Dropdown";

const LeftActionGroup = ({
  articles,
  categories,
  selectedArticleIds,
  refetch,
  setSelectedArticleIds,
}) => (
  <div className="flex gap-x-3 items-center	">
    <span>
      <b>{selectedArticleIds.length} articles</b> selected of&nbsp;
      {articles.length}
    </span>
    <ChangeCategoryDropdown
      categories={categories}
      refetch={refetch}
      selectedArticleIds={selectedArticleIds}
      setSelectedArticleIds={setSelectedArticleIds}
    />
    <ChangeStatusDropdown
      refetch={refetch}
      selectedArticleIds={selectedArticleIds}
      setSelectedArticleIds={setSelectedArticleIds}
    />
    <DeleteArticleButton
      refetch={refetch}
      selectedArticleIds={selectedArticleIds}
      setSelectedArticleIds={setSelectedArticleIds}
    />
  </div>
);

export default LeftActionGroup;
