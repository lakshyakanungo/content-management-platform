import React, { useCallback, useContext } from "react";

import categoriesApi from "apis/categories";

import { CategoriesContext } from ".";

import ListItem from "./ListItem";
import { swapItemsInArray } from "./utils";

const List = () => {
  const { categories, setCategories, fetchCategories } =
    useContext(CategoriesContext);

  const handleReorder = async ({ category, finalPosition }) => {
    try {
      await categoriesApi.update({
        id: category.id,
        payload: { position: finalPosition },
      });
      fetchCategories();
    } catch (error) {
      logger.log(error);
    }
  };

  const moveCategoryListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = categories[dragIndex];
      const hoverItem = categories[hoverIndex];

      setCategories(categories =>
        swapItemsInArray(categories, dragIndex, hoverIndex, dragItem, hoverItem)
      );
    },
    [categories]
  );

  return (
    <ul className="flex flex-col gap-2">
      {categories.map((category, index) => (
        <ListItem
          category={category}
          handleReorder={handleReorder}
          index={index}
          key={category.id}
          moveListItem={moveCategoryListItem}
        />
      ))}
    </ul>
  );
};

export default List;
