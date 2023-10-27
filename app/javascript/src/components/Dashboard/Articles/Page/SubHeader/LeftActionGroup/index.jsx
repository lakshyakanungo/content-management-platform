import React from "react";

import { Trans } from "react-i18next";

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
      <Trans
        components={[<b key={1} />]}
        i18nKey="dashboard.articles.page.subheader.leftActionGroup.headerText"
        values={{ count: selectedArticleIds.length, total: articles.length }}
      />
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
