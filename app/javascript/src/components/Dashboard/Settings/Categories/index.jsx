import React, { useState } from "react";

import { Button, Spinner } from "@bigbinary/neetoui";
import { Plus } from "neetoicons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";

import { useFetchCategories } from "hooks/reactQuery/settings/category/useCategory";

import List from "./List";
import AddCategoryModal from "./Modals/Create";

import Layout from "../Layout";

const CategoriesContext = React.createContext();

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const { isLoading } = useFetchCategories({ setCategories });

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Layout
      className="mx-24 w-9/12	"
      description={t("dashboard.settings.categories.description")}
      header={t("dashboard.settings.categories.header")}
    >
      <div className="flex justify-between">
        <span className="neeto-ui-text-gray-600 neeto-ui-text-sm">
          {t("dashboard.settings.categories.count", {
            count: categories.length,
          })}
        </span>
        <Button
          className="neeto-ui-text-primary-500"
          icon={Plus}
          iconPosition="left"
          label={t("dashboard.settings.categories.button.new")}
          size="small"
          style="link"
          onClick={() => setShowAddCategoryModal(true)}
        />
      </div>
      {showAddCategoryModal && (
        <AddCategoryModal
          setShowAddCategoryModal={setShowAddCategoryModal}
          showAddCategoryModal={showAddCategoryModal}
        />
      )}
      <div>
        <DndProvider backend={HTML5Backend}>
          <CategoriesContext.Provider value={{ categories, setCategories }}>
            <List />
          </CategoriesContext.Provider>
        </DndProvider>
      </div>
    </Layout>
  );
};

export default Categories;

export { CategoriesContext };
