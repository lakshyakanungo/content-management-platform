import React, { useState } from "react";

import { Alert as NeetoAlert } from "neetoui";

import categoriesApi from "apis/categories";

const Alert = ({ fetchCategories, category }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async ({ selectedCategory }) => {
    // console.log(selectedCategory);
    try {
      await categoriesApi.destroy({
        id: category.id,
        payload: {
          id: category.id,
          move_into_category_id: selectedCategory?.id,
        },
      });
      fetchCategories();
      setIsOpen(false);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <NeetoAlert
      isOpen={isOpen}
      message="This category has 0 articles."
      submitButtonLabel="Delete"
      title="Confirm category deletion?"
      onClose={() => setIsOpen(false)}
      onSubmit={handleSubmit}
    />
  );
};

export default Alert;
