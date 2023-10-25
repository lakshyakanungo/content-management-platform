import React, { useState, useRef } from "react";

import { Form, Select as FormikSelect, Button } from "neetoui/formik";

import articlesApi from "apis/articles";

import ActionDropdown from "./ActionDropdown";
import { EDITOR_VALIDATION_SCHEMA } from "./constants";
import Editor from "./Editor";
import { parseData } from "./utils";

const Create = ({ categories, setShowCreateArticle, refetch }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  const editorRef = useRef(null);

  const handleCreate = async ({ selectedCategory }) => {
    try {
      const data = parseData({
        selectedCategory,
        editorRef,
        selectedOptionIndex,
      });

      await articlesApi.create({ payload: data });
      setShowCreateArticle(false);
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
            selectedCategory: null,
            editor: "<p></p>",
          },
          onSubmit: handleCreate,
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
                    name="selectedCategory"
                    optionRemapping={{ label: "name", value: "id" }}
                    options={categories}
                    placeholder="Search category"
                    className={`neeto-ui-text-gray-500 neeto-ui-font-normal flex flex-row gap-2 items-center ${
                      props.isValid ? "w-72" : "w-96"
                    }`}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    disabled={false}
                    label="Cancel"
                    style="secondary"
                    type="reset"
                    onClick={() => setShowCreateArticle(false)}
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

export default Create;
