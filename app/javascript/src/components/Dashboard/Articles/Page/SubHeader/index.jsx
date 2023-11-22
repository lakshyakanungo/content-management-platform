import React, { useContext, useMemo } from "react";

import { Tag } from "neetoui";
import { useTranslation } from "react-i18next";

import NeetoSubHeader from "neetomolecules/SubHeader";

import Columns from "./Columns";
import LeftActionGroup from "./LeftActionGroup";

import { CategoryContext, SelectedArticlesContext } from "../..";
import { buildArticlesColumnData } from "../Table/utils";

const SubHeader = ({
  handleDelete,
  handleStatusChange,
  setCurrentPageNumber,
  setVisibleTableColumns,
  totalArticlesCount,
}) => {
  const columns = useMemo(
    () => buildArticlesColumnData({ handleStatusChange, handleDelete }),
    []
  );

  const { categories, selectedCategories, setSelectedCategories } =
    useContext(CategoryContext);

  const { selectedArticleIds, setSelectedArticleIds } = useContext(
    SelectedArticlesContext
  );

  const { t } = useTranslation();

  const handleTagClose = category => {
    setSelectedCategories(prev => prev.filter(item => item !== category));
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
