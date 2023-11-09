import React, { useState, useRef, useEffect } from "react";

import { Spinner, Typography, Button } from "@bigbinary/neetoui";
import {
  Form,
  Select as FormikSelect,
  Button as FormikButton,
} from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import VersionHistory from "./VersionHistory";

import ActionDropdown from "../ActionDropdown";
import { EDITOR_VALIDATION_SCHEMA } from "../constants";
import Editor from "../Editor";
import { buildSelectClassName, parseData } from "../utils";

const Edit = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  // const [versions, setvVersions] = useState([]);
  // console.log(article, "Article data");

  const history = useHistory();
  const { id } = useParams();

  const editorRef = useRef(null);

  const { t } = useTranslation();

  const getDefaultCategory = () =>
    categories.find(category => category.id === article.categoryId);

  const handleEdit = async ({ selectedCategory }) => {
    try {
      const data = parseData({
        selectedCategory,
        editorRef,
        selectedOptionIndex,
      });
      await articlesApi.update({ id, payload: data });
      history.push("/articles");
    } catch (error) {
      logger.log(error);
    }
  };

  const fetchArticle = async () => {
    try {
      const {
        data: { article },
      } = await articlesApi.show(id);
      // console.log(article);
      setArticle(article);
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
    }
  };

  const fetchArticleAndCategories = async () => {
    setLoading(true);
    await Promise.all([fetchArticle(), fetchCategories()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticleAndCategories();
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
                    placeholder={t(
                      "dashboard.articles.actions.edit.placeholder"
                    )}
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <Typography
                    className="neeto-ui-text-primary-500"
                    style="h5"
                    textTransform="capitalize"
                  >
                    {article.status}
                  </Typography>
                  <Button
                    label="View version history"
                    style="text"
                    type="button"
                    onClick={() => setShowVersionHistory(true)}
                  />
                </div>
                <div className="flex gap-3">
                  <FormikButton
                    disabled={false}
                    label={t("dashboard.articles.actions.edit.cancelButton")}
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
            <Editor editorRef={editorRef} />
          </>
        )}
      </Form>
      <VersionHistory
        setShowVersionHistory={setShowVersionHistory}
        showVersionHistory={showVersionHistory}
        versions={article.versions}
      />
    </div>
  );
};

export default Edit;
