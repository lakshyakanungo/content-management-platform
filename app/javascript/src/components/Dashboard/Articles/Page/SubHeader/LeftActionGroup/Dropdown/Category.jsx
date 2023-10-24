import React from "react";

import { Dropdown } from "neetoui";

const Category = ({
  categories,
  handleBulkCategoryChange,
  selectedArticleIds,
}) => {
  const { Menu, MenuItem } = Dropdown;

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
  );
};

export default Category;
