import React, { useState } from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import * as yup from "yup";

import ArticlePage from "./ArticlePage";
import Menu from "./Menu";

const Articles = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const { Header, Body, Footer } = Modal;

  const handleSubmit = () => {
    // handle submit here
    setShowAddCategoryModal(false);
  };

  return (
    <div className="w-full flex flex-row">
      <Menu
        isMenuOpen={isMenuOpen}
        setShowAddCategoryModal={setShowAddCategoryModal}
        showAddCategoryModal={showAddCategoryModal}
      />
      <ArticlePage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Modal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
      >
        <Header>
          <Typography style="h2" weight="medium">
            New Category
          </Typography>
        </Header>
        <Form
          formikProps={{
            initialValues: { catgeory: "" },
            onSubmit: handleSubmit,
            validationSchema: yup.object().shape({
              category: yup.string().required("Category title is required"),
            }),
            onReset: () => setShowAddCategoryModal(false),
          }}
        >
          <Body>
            <Input
              label="Category title"
              name="category"
              placeholder="Enter category title here."
              labelProps={{
                className: "neeto-ui-text-gray-700 neeto-ui-font-light",
              }}
            />
          </Body>
          <Footer>
            <Button className="mr-2" label="Add" type="submit" />
            <Button label="Cancel" style="text" type="reset" />
          </Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Articles;
