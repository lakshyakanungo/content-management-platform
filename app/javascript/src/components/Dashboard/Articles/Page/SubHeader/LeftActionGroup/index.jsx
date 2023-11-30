import React from "react";

import { Trans } from "react-i18next";

import { useSelectedArticlesStore } from "hooks/zustand/useSelectedArticlesStore";

import DeleteArticleButton from "./Delete";
import {
  Category as ChangeCategoryDropdown,
  Status as ChangeStatusDropdown,
} from "./Dropdown";

const LeftActionGroup = ({ categories, totalArticlesCount }) => {
  const { selectedArticleIds } = useSelectedArticlesStore();

  return (
    <div className="flex gap-x-3 items-center	">
      <span>
        <Trans
          components={[<b key={1} />]}
          i18nKey="dashboard.articles.page.subheader.leftActionGroup.headerText"
          values={{
            count: selectedArticleIds.length,
            total: totalArticlesCount,
          }}
        />
      </span>
      <ChangeCategoryDropdown categories={categories} />
      <ChangeStatusDropdown />
      <DeleteArticleButton />
    </div>
  );
};

export default LeftActionGroup;
