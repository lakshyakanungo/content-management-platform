import React, { useMemo } from "react";

import { Tag } from "neetoui";
import { useTranslation } from "react-i18next";

import { useFetchCategories } from "hooks/reactQuery/category/useCategory";
import { useSelectedArticlesStore } from "hooks/zustand/useSelectedArticlesStore";
import { useSelectedCategoriesStore } from "hooks/zustand/useSelectedCategoriesStore";
import NeetoSubHeader from "neetomolecules/SubHeader";

import Columns from "./Columns";
import LeftActionGroup from "./LeftActionGroup";

import { buildArticlesColumnData } from "../Table/utils";

const SubHeader = ({
  handleDelete,
  handleStatusChange,
  setCurrentPageNumber,
  setVisibleTableColumns,
  totalArticlesCount,
}) => {
  const { data: { categories = [] } = {} } = useFetchCategories();

  const { selectedCategories, setSelectedCategories } =
    useSelectedCategoriesStore();

  const { selectedArticleIds, setSelectedArticleIds } =
    useSelectedArticlesStore();

  const columns = useMemo(
    () => buildArticlesColumnData({ handleStatusChange, handleDelete }),
    []
  );

  const { t } = useTranslation();

  const handleTagClose = category => {
    const updatedCategories = selectedCategories.filter(
      item => item !== category
    );
    setSelectedCategories(updatedCategories);
    setSelectedArticleIds([]);
    setCurrentPageNumber(1);
  };

  return (
    <NeetoSubHeader
      className="w-full"
      leftActionBlock={
        <div className="flex gap-x-3 items-center">
          {selectedArticleIds.length ? (
            <LeftActionGroup
              categories={categories}
              totalArticlesCount={totalArticlesCount}
            />
          ) : (
            <div>
              {t("dashboard.articles.page.subheader.numberOfArticles", {
                count: totalArticlesCount,
              })}
            </div>
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
