import React, { useContext } from "react";

import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import {
  PageContext,
  SelectedArticlesContext,
} from "components/Dashboard/Articles";
import { useBulkCategoryChange } from "hooks/reactQuery/articles/page/useBulkUpdate";

const Category = ({ categories }) => {
  const { refetch } = useContext(PageContext);
  const { selectedArticleIds, setSelectedArticleIds } = useContext(
    SelectedArticlesContext
  );

  const { mutate: handleBulkCategoryChange } = useBulkCategoryChange({
    refetch,
    setSelectedArticleIds,
  });

  const { Menu, MenuItem } = Dropdown;
  const { t } = useTranslation();

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
            onClick={() =>
              handleBulkCategoryChange({
                categoryId: category.id,
                selectedArticleIds,
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
