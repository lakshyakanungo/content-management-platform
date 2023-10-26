import React, { useCallback } from "react";

import categoriesApi from "apis/categories";

import ListItem from "./ListItem";

const List = ({ categories, setCategories, fetchCategories }) => {
  // const [categories, setCategories] = useState(categories);

  const handleMove = async ({ category, finalPosition }) => {
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
      // Swap places of dragItem and hoverItem in the categories array
      setCategories(categories => {
        const updatedCategories = [...categories];
        updatedCategories[dragIndex] = hoverItem;
        updatedCategories[hoverIndex] = dragItem;

        return updatedCategories;
      });
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
          handleMove={handleMove}
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
