import React, { useCallback } from "react";

import categoriesApi from "apis/categories";

import ListItem from "./ListItem";
import { swapItemsInArray } from "./utils";

const List = ({ categories, setCategories, fetchCategories }) => {
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
          categories={categories}
          category={category}
          fetchCategories={fetchCategories}
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
