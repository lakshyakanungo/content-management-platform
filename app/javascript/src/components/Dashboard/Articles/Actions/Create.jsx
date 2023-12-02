import React, { useState } from "react";

import { Form, Select as FormikSelect, Button } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useCreateArticle } from "hooks/reactQuery/articles/actions/create/useCreateArticle";
import { useFetchCategories } from "hooks/reactQuery/category/useCategory";

import ActionDropdown from "./ActionDropdown";
import Editor from "./Editor";
import { buildFormValidationSchema, parseData } from "./utils";

const Create = () => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  const history = useHistory();

  const { data: { categories = [] } = {} } = useFetchCategories();
  const { mutate: handleCreate } = useCreateArticle({
    onSuccess: () => history.push("/articles"),
  });

  const { t } = useTranslation();

  const handleSubmit = ({ selectedCategory, editor }) => {
    const payload = parseData({
      editor,
      selectedCategory,
      selectedOptionIndex,
    });

    handleCreate({ payload });
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Form
        formikProps={{
          initialValues: {
            selectedCategory: null,
            editor: {
              title: "",
              description: "<p></p>",
            },
          },
          onSubmit: handleSubmit,
          enableReinitialize: true,
          validationSchema: buildFormValidationSchema(categories),
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
            <Editor />
          </>
        )}
      </Form>
    </div>
  );
};

export default Create;
