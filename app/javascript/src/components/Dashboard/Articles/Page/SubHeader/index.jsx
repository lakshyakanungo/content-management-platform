import React, { useMemo } from "react";

import { Tag } from "neetoui";

import NeetoSubHeader from "neetomolecules/SubHeader";

import Columns from "./Columns";
import LeftActionGroup from "./LeftActionGroup";

import { buildArticlesColumnData } from "../Table/utils";

const SubHeader = ({
  selectedArticleIds,
  articles,
  categories,
  handleDelete,
  handleStatusChange,
  selectedCategories,
  setSelectedCategories,
  setVisibleTableColumns,
  setClickedArticle,
  setShowEditArticle,
  refetch,
  setSelectedArticleIds,
}) => {
  const columns = useMemo(
    () =>
      buildArticlesColumnData({
        handleStatusChange,
        handleDelete,
        setClickedArticle,
        setShowEditArticle,
      }),
    []
  );

  const handleTagClose = category => {
    // console.log("working");
    // console.log(selectedCategories);
    // const categoriesAfterClose = selectedCategories.filter(
    //   item => item !== category
    // );
    // console.log(categoriesAfterClose, "catgories after close");
    setSelectedCategories(prev => prev.filter(item => item !== category));
  };

  return (
    <NeetoSubHeader
      className="w-11/12"
      leftActionBlock={
        <div className="flex gap-x-3 items-center">
          {selectedArticleIds.length ? (
            <LeftActionGroup
              articles={articles}
              categories={categories}
              refetch={refetch}
              selectedArticleIds={selectedArticleIds}
              setSelectedArticleIds={setSelectedArticleIds}
            />
          ) : (
            <div>{articles.length} articles</div>
          )}
          {selectedCategories.map(category => (
            <Tag
              key={category.id}
              label={category.name}
              onClose={() => handleTagClose(category)}
            />
          ))}
        </div>
      }
      rightActionBlock={
        !selectedArticleIds.length && (
          <Columns
            columns={columns}
            setVisibleTableColumns={setVisibleTableColumns}
          />
        )
      }
    />
  );
};

export default SubHeader;
