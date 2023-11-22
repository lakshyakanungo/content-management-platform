import React, { useContext } from "react";

import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";
import {
  PageContext,
  SelectedArticlesContext,
} from "components/Dashboard/Articles";

const Category = ({ categories }) => {
  const { refetch } = useContext(PageContext);
  const { selectedArticleIds, setSelectedArticleIds } = useContext(
    SelectedArticlesContext
  );

  const { Menu, MenuItem } = Dropdown;

  const { t } = useTranslation();

  const handleBulkCategoryChange = async categoryId => {
    try {
      await articlesApi.bulkUpdate({
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
