import React from "react";

import { t } from "i18next";
import { Dropdown } from "neetoui";

import articlesApi from "apis/articles";

const Category = ({
  categories,
  selectedArticleIds,
  setSelectedArticleIds,
  refetch,
}) => {
  const { Menu, MenuItem } = Dropdown;

  const handleBulkCategoryChange = async categoryId => {
    try {
      await articlesApi.updateMultiple({
        ids: selectedArticleIds,
        payload: { category_id: categoryId },
      });
      setSelectedArticleIds([]);
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

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
            onClick={() => handleBulkCategoryChange(category.id)}
          >
            {category.name}
          </MenuItem.Button>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default Category;
