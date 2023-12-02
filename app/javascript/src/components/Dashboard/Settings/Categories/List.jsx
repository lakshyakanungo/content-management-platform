import React, { useCallback } from "react";

import ListItem from "./ListItem";
import { swapItemsInArray } from "./utils";

const List = ({ categories, setCategories }) => {
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
          index={index}
          key={category.id}
          moveListItem={moveCategoryListItem}
        />
      ))}
    </ul>
  );
};

export default List;
