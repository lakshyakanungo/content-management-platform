import React, { useMemo } from "react";

import { Tag } from "neetoui";
import { useTranslation } from "react-i18next";

import NeetoSubHeader from "neetomolecules/SubHeader";

import Columns from "./Columns";
import LeftActionGroup from "./LeftActionGroup";

import { buildArticlesColumnData } from "../Table/utils";

const SubHeader = ({
  selectedArticleIds,
  categories,
  handleDelete,
  handleStatusChange,
  selectedCategories,
  setSelectedCategories,
  setVisibleTableColumns,
  refetch,
  setSelectedArticleIds,
  totalArticlesCount,
}) => {
  const columns = useMemo(
    () => buildArticlesColumnData({ handleStatusChange, handleDelete }),
    []
  );

  const { t } = useTranslation();

  const handleTagClose = category => {
    setSelectedCategories(prev => prev.filter(item => item !== category));
    setSelectedArticleIds([]);
  };

  return (
    <NeetoSubHeader
      className="w-full"
      leftActionBlock={
        <div className="flex gap-x-3 items-center">
          {selectedArticleIds.length ? (
            <LeftActionGroup
              categories={categories}
              refetch={refetch}
              selectedArticleIds={selectedArticleIds}
              setSelectedArticleIds={setSelectedArticleIds}
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
