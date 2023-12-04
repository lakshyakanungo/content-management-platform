import React from "react";

import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import { useBulkCategoryChange } from "hooks/reactQuery/articles/page/useBulkUpdateArticlesApi";
import { useSelectedArticlesStore } from "hooks/zustand/useSelectedArticlesStore";

const Category = ({ categories }) => {
  const { selectedArticleIds, setSelectedArticleIds } =
    useSelectedArticlesStore();

  const { mutate: updateBulkCategory } = useBulkCategoryChange({
    onSuccess: () => setSelectedArticleIds([]),
  });

  const { Menu, MenuItem } = Dropdown;
  const { t } = useTranslation();

  const handleClick = category =>
    updateBulkCategory({
      ids: selectedArticleIds,
      payload: { category_id: category.id },
    });

  return (
    <Dropdown
      buttonSize="medium"
      buttonStyle="secondary"
      strategy="fixed"
      label={t(
        "dashboard.articles.page.subheader.leftActionGroup.categoryDropdownLabel"
      )}
    >
      <Menu>
        {categories.map(category => (
          <MenuItem.Button
            key={category.id}
            onClick={() => handleClick(category)}
          >
            {category.name}
          </MenuItem.Button>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default Category;
