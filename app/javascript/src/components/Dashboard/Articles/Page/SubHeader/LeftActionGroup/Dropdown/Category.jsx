import React from "react";

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
      label="Change category"
      strategy="fixed"
    >
      <Menu>
        {categories.map(category => (
          // console.log(category);
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
