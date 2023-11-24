import React, { useState, useRef, useEffect } from "react";

import { Spinner } from "@bigbinary/neetoui";
import { Form, Select as FormikSelect, Button } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ActionDropdown from "./ActionDropdown";
import { FORM_VALIDATION_SCHEMA } from "./constants";
// import Editor from "./Editor";
import CreateEditor from "./CreateEditor";
import { parseData } from "./utils";

const Create = () => {
  const [loading, setLoading] = useState(true);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  const history = useHistory();

  const editorRef = useRef(null);

  const { t } = useTranslation();

  const handleCreate = async ({ selectedCategory }) => {
    try {
      const data = parseData({
        selectedCategory,
        editorRef,
        selectedOptionIndex,
      });

      await articlesApi.create({ payload: data });
      history.push("/articles");
    } catch (error) {
      logger.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategories(categories);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <Form
        formikProps={{
          initialValues: {
            selectedCategory: null,
            editor: "<p></p>",
          },
          onSubmit: handleCreate,
          validationSchema: FORM_VALIDATION_SCHEMA,
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
                    className={`neeto-ui-text-gray-500 neeto-ui-font-normal flex flex-row gap-2 items-center ${
                      props.isValid ? "w-72" : "w-96"
                    }`}
                    placeholder={t(
                      "dashboard.articles.actions.create.placeholder"
                    )}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    disabled={false}
                    label={t("dashboard.articles.actions.create.cancelButton")}
                    style="secondary"
                    type="reset"
                    onClick={() => history.push("/articles")}
                  />
                  <ActionDropdown
                    formikProps={props}
                    selectedOptionIndex={selectedOptionIndex}
                    setSelectedOptionIndex={setSelectedOptionIndex}
                  />
                </div>
              </div>
            </div>
            <CreateEditor ref={editorRef} />
          </>
        )}
      </Form>
    </div>
  );
};

export default Create;
