import React, { useState, useRef } from "react";

import { Form, Select as FormikSelect, Button } from "neetoui/formik";

import articlesApi from "apis/articles";

import ActionDropdown from "./ActionDropdown";
import { EDITOR_VALIDATION_SCHEMA } from "./constants";
import Editor from "./Editor";
import { buildSelectClassName, parseData } from "./utils";

const Edit = ({ article, categories, setShowEditArticle, refetch }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  const editorRef = useRef(null);

  const getDefaultCategory = () =>
    categories.find(category => category.id === article.category_id);

  const handleEdit = async ({ selectedCategory }) => {
    try {
      const data = parseData({
        selectedCategory,
        editorRef,
        selectedOptionIndex,
      });
      await articlesApi.update({ id: article.id, payload: data });
      setShowEditArticle(false);
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Form
        formikProps={{
          initialValues: {
            selectedCategory: getDefaultCategory(),
            editor: article.body,
          },
          onSubmit: handleEdit,
          validationSchema: EDITOR_VALIDATION_SCHEMA,
        }}
      >
        {props => (
          <>
            <div className="px-4 py-5">
              <div className="flex w-full justify-between">
                <div className="w-fit">
                  <FormikSelect
                    isClearable
                    isSearchable
                    validateOnBlur
                    validateOnChange
                    className={buildSelectClassName(props)}
                    name="selectedCategory"
                    optionRemapping={{ label: "name", value: "id" }}
                    options={categories}
                    placeholder="Search category"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    disabled={false}
                    label="Cancel"
                    style="secondary"
                    type="reset"
                    onClick={() => setShowEditArticle(false)}
                  />
                  <ActionDropdown
                    formikProps={props}
                    selectedOptionIndex={selectedOptionIndex}
                    setSelectedOptionIndex={setSelectedOptionIndex}
                  />
                </div>
              </div>
            </div>
            <Editor editorRef={editorRef} />
          </>
        )}
      </Form>
    </div>
  );
};

export default Edit;
