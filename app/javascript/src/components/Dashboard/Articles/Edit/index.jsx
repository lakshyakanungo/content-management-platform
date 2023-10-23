import React, { useState, useRef } from "react";

// import Container from "@bigbinary/neeto-molecules/Container";
import { Editor } from "@bigbinary/neeto-editor";
import Header from "@bigbinary/neeto-molecules/Header";
import { ActionDropdown, Button, Select } from "@bigbinary/neetoui";
import { Check } from "neetoicons";

import articlesApi from "apis/articles";

// import { EDITOR_INITIAL_HTML } from "./constants";
// import { extractTitle } from "./utils";

const Edit = ({ article, categories, setShowEditArticle, refetch }) => {
  // console.log(article);
  // console.log(categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    article.category_id
  );
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [showError, setShowError] = useState(false);

  // console.log(showError);
  // console.log(selectedCategoryId);

  // const STATUS_OPTIONS = ["Save as draft", "Publish"];
  const STATUS_OPTIONS = [
    { label: "Save as draft", value: "Draft" },
    { label: "Publish", value: "Published" },
  ];

  const { Menu, MenuItem } = ActionDropdown;

  const editorRef = useRef(null);

  const handleEdit = async () => {
    try {
      const data = parseData();
      // await articlesApi.update({ title, status, body, categoryId });
      await articlesApi.update({ id: article.id, payload: data });
      setShowEditArticle(false);
      refetch();
    } catch (error) {
      logger.log(error);
    }
  };

  const handleOnChange = e => {
    e;
    // category => setSelectedCategoryId(category.id)
    // console.log(e);
    // console.log(e.target.value);
    setSelectedCategoryId("");
  };

  const getDefaultCategory = selectedCategoryId => {
    // console.log(categories);
    // console.log(selectedCategoryId);
    const category = categories.find(
      category => category.id === selectedCategoryId
    );

    // console.log(category);
    return category;
  };
  getDefaultCategory();

  const parseData = () => {
    const body = editorRef.current.editor.getHTML();
    const jsonOfContent = editorRef.current.editor.getJSON();
    const title = extractTitle(jsonOfContent);
    const status = STATUS_OPTIONS[selectedOptionIndex].value;

    if (selectedCategoryId === "") {
      setShowError(true);
      throw new Error("select category");
    } else {
      return { title, status, body, category_id: selectedCategoryId };
    }
  };

  const extractTitle = jsonOfEditorContent =>
    jsonOfEditorContent.content[0].content[0].text;

  return (
    <div className="w-full h-screen flex flex-col">
      <Header
        className="px-4"
        actionBlock={
          <>
            <Button
              label="Cancel"
              style="secondary"
              type="button"
              onClick={() => setShowEditArticle(false)}
            />
            <ActionDropdown
              label={STATUS_OPTIONS[selectedOptionIndex].label}
              value={STATUS_OPTIONS[selectedOptionIndex].value}
              onClick={handleEdit}
            >
              <Menu className="flex flex-col">
                {STATUS_OPTIONS.map((option, index) => (
                  <MenuItem.Button
                    key={option.value}
                    prefix={
                      <Check
                        size={20}
                        color={
                          selectedOptionIndex === index ? "#252C32" : "inherit"
                        }
                      />
                    }
                    onClick={() => {
                      setSelectedOptionIndex(index);
                    }}
                  >
                    <span
                      className={
                        selectedOptionIndex === index
                          ? "neeto-ui-text-gray-800"
                          : "neeto-ui-text-gray-700"
                      }
                    >
                      {option.label}
                    </span>
                  </MenuItem.Button>
                ))}
              </Menu>
            </ActionDropdown>
          </>
        }
        title={
          <div className="flex gap-2 items-center">
            <Select
              isSearchable
              className="w-72 neeto-ui-text-gray-500 neeto-ui-font-normal"
              default={getDefaultCategory}
              name="selectedCategory"
              optionRemapping={{ label: "name", value: "id" }}
              options={categories}
              placeholder="Search category"
              // default={() => findCategory(selectedCategoryId)}
              onChange={handleOnChange}
            />
            {showError && !selectedCategoryId && (
              <span className="neeto-ui-text-error-800 neeto-ui-text-xs neeto-ui-font-normal">
                Article category is a required field
              </span>
            )}
          </div>
        }
      />
      <Editor
        autoFocus
        showImageInMention
        contentClassName="px-40 "
        heightStrategy="flexible"
        initialValue={article.body}
        ref={editorRef}
        rows={25}
        addons={[
          "block-quote",
          "code-block",
          "attachments",
          "undo",
          "redo",
          "text-color",
        ]}
        mentions={[
          {
            name: "Oliver Smith",
            key: "oliver-smith",
            imageUrl: "https://i.pravatar.cc/300",
          },
          {
            name: "Eve Smith",
            key: "eve-smith",
            imageUrl: "https://i.pravatar.cc/300",
          },
        ]}
      />
      {/* <Button
        className="w-20"
        // onClick={handlTryClick}
      >
        Get Html
      </Button> */}
    </div>
  );
};

export default Edit;
