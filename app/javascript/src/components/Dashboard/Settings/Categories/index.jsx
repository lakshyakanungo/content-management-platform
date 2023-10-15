import React, { useEffect, useState } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { Button } from "@bigbinary/neetoui";
import { Plus } from "neetoicons";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import categoriesApi from "apis/categories";

import AddCategoryModal from "./Form/Create";
import List from "./List";

import Layout from "../Layout";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // console.log(categories);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories: results },
      } = await categoriesApi.fetch();
      // console.log(results);
      setCategories(results);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async ({ category }) => {
    try {
      await categoriesApi.create({ name: category });
      fetchCategories();
    } catch (error) {
      logger.log(error);
    } finally {
      setShowAddCategoryModal(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Layout
      className="mx-24 w-9/12	"
      description="Create and configure the categories inside your scribble."
      header="Manage categories"
    >
      <div className="flex justify-between">
        <span className="neeto-ui-text-gray-600 neeto-ui-text-sm">
          {categories.length} categories
        </span>
        <Button
          className="neeto-ui-text-primary-500"
          icon={Plus}
          iconPosition="left"
          label="New category"
          size="small"
          style="link"
          onClick={() => setShowAddCategoryModal(true)}
        />
      </div>
      {showAddCategoryModal && (
        <AddCategoryModal
          handleAddCategory={handleAddCategory}
          setShowAddCategoryModal={setShowAddCategoryModal}
          showAddCategoryModal={showAddCategoryModal}
        />
      )}
      <div>
        <DndProvider backend={HTML5Backend}>
          <List
            categories={categories}
            fetchCategories={fetchCategories}
            setCategories={setCategories}
          />
        </DndProvider>
      </div>
    </Layout>
  );
};

export default Categories;
