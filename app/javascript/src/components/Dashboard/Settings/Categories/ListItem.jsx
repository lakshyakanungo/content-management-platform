import React, { useState } from "react";

import categoriesApi from "apis/categories";
import useDragAndDrop from "hooks/useDragAndDrop";

import Dropdown from "./Dropdown";
import Edit from "./Form/Edit";

import MenuSquare from "/Users/bigbinary/Desktop/new-dev/Scribble/app/assets/images/MenuSquare";
// import MenuSquare from "app/assets/images/MenuSqaure.svg";
const ListItem = ({
  text,
  index,
  moveListItem,
  category,
  fetchCategories,
  handleMove,
}) => {
  // console.log(category);
  const [isDragging, dragDropRef] = useDragAndDrop({
    index,
    category,
    moveListItem,
    handleMove,
  });

  // Make items being dragged transparent, so it's easier to see where we drop them
  const opacity = isDragging ? 0 : 1;
  opacity;

  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);

  const handleEdit = async ({ category: name }) => {
    try {
      await categoriesApi.update({
        id: category.id,
        payload: { name },
      });
      fetchCategories();
      setShowEditCategoryModal(false);
    } catch (error) {
      logger.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await categoriesApi.destroy(category.id);
      fetchCategories();
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <li className="group flex flex-row items-center" ref={dragDropRef}>
      <span className="invisible group-hover:visible">
        <MenuSquare />
      </span>
      <div className="flex-grow flex justify-between items-center p-2 group-hover:bg-gray-100 group-active:bg-gray-100">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-1 ">
            <span className="neeto-ui-text-gray-800 neeto-ui-text-base">
              {text}
            </span>
            <span className="neeto-ui-text-gray-500 neeto-ui-text-sm">
              {6} articles
            </span>
          </div>
        </div>
        <Dropdown
          handleDelete={handleDelete}
          setShowEditCategoryModal={setShowEditCategoryModal}
        />
        {showEditCategoryModal && (
          <Edit
            category={category}
            handleEdit={handleEdit}
            setShowEditCategoryModal={setShowEditCategoryModal}
            showEditCategoryModal={showEditCategoryModal}
          />
        )}
      </div>
    </li>
  );
};

export default ListItem;
