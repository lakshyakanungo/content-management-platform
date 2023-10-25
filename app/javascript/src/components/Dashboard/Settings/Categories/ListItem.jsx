import React, { useState } from "react";

import useDragAndDrop from "hooks/useDragAndDrop";

import Alert from "./Alert";
import Dropdown from "./Dropdown";
import DeleteModal from "./Modals/Delete";
import Edit from "./Modals/Edit";

import MenuSquare from "/Users/bigbinary/Desktop/new-dev/Scribble/app/assets/images/MenuSquare";

const ListItem = ({
  text,
  index,
  moveListItem,
  category,
  categories,
  fetchCategories,
  handleMove,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dragDropRef = useDragAndDrop({
    index,
    category,
    moveListItem,
    handleMove,
  });

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
              {category.articlesCount} articles
            </span>
          </div>
        </div>
        <Dropdown
          setShowDeleteModal={setShowDeleteModal}
          setShowEditModal={setShowEditModal}
        />
        {showEditModal && (
          <Edit
            category={category}
            fetchCategories={fetchCategories}
            setShowEditModal={setShowEditModal}
            showEditModal={showEditModal}
          />
        )}
        {showDeleteModal &&
          (category.articlesCount > 0 ? (
            <DeleteModal
              categories={categories}
              category={category}
              fetchCategories={fetchCategories}
              hasMultipleCategories={categories.length > 1}
              setShowDeleteModal={setShowDeleteModal}
              showDeleteModal={showDeleteModal}
            />
          ) : (
            <Alert category={category} fetchCategories={fetchCategories} />
          ))}
      </div>
    </li>
  );
};

export default ListItem;
