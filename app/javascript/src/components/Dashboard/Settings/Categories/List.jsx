import React, { useCallback } from "react";

import ListItem from "./ListItem";

const List = ({ categories, setCategories, fetchCategories }) => {
  // const [categories, setCategories] = useState(categories);

  const moveCategoryListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = categories[dragIndex];
      const hoverItem = categories[hoverIndex];
      // Swap places of dragItem and hoverItem in the categories array
      setCategories(categories => {
        const updatedCategories = [...categories];
        updatedCategories[dragIndex] = hoverItem;
        updatedCategories[hoverIndex] = dragItem;

        return updatedCategories;
      });
      // console.log(categories);
    },
    [categories]
  );

  return (
    <ul className="flex flex-col gap-5 p-2">
      {categories.map((category, index) => (
        <ListItem
          category={category}
          fetchCategories={fetchCategories}
          index={index}
          key={category.id}
          moveListItem={moveCategoryListItem}
          text={category.name}
        />
      ))}
    </ul>
  );
};

export default List;
