import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import useDragAndDrop from "hooks/useDragAndDrop";

import DeleteAlert from "./DeleteAlert";
import Dropdown from "./Dropdown";
import DeleteModal from "./Modals/Delete";
import EditModal from "./Modals/Edit";

import MenuSquare from "../../../../../../assets/images/MenuSquare";

const ListItem = ({
  index,
  moveListItem,
  category,
  categories,
  fetchCategories,
  handleReorder,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  const { t } = useTranslation();

  const dragDropRef = useDragAndDrop({
    index,
    category,
    moveListItem,
    handleReorder,
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
              {category.name}
            </span>
            <span className="neeto-ui-text-gray-500 neeto-ui-text-sm">
              {t("dashboard.settings.categories.listItem.articlesCount", {
                count: category.articlesCount,
              })}
            </span>
          </div>
        </div>
        <Dropdown
          setShowDeleteOverlay={setShowDeleteOverlay}
          setShowEditModal={setShowEditModal}
        />
        {showEditModal && (
          <EditModal
            category={category}
            fetchCategories={fetchCategories}
            setShowEditModal={setShowEditModal}
            showEditModal={showEditModal}
          />
        )}
        {showDeleteOverlay &&
          (category.articlesCount > 0 ? (
            <DeleteModal
              categories={categories}
              category={category}
              fetchCategories={fetchCategories}
              hasMultipleCategories={categories.length > 1}
              setShowDeleteOverlay={setShowDeleteOverlay}
              showDeleteOverlay={showDeleteOverlay}
            />
          ) : (
            <DeleteAlert
              category={category}
              fetchCategories={fetchCategories}
              setShowDeleteOverlay={setShowDeleteOverlay}
              showDeleteOverlay={showDeleteOverlay}
            />
          ))}
      </div>
    </li>
  );
};

export default ListItem;
