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

import Schedule from "./Schedule";
import ScheduleDetails from "./Schedule/Details";
import VersionHistory from "./VersionHistory";

import ActionDropdown from "../ActionDropdown";
import { FORM_VALIDATION_SCHEMA } from "../constants";
import Editor from "../Editor";
import { buildSelectClassName, parseData } from "../utils";

const Edit = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  const editorRef = useRef(null);

  const { t } = useTranslation();

  const getDefaultCategory = () =>
    categories.find(category => category.id === article.categoryId);

  const handleEdit = async values => {
    try {
      const data = parseData({
        selectedCategory: values.selectedCategory,
        editorRef,
        selectedOptionIndex,
      });

      await articlesApi.update({
        id,
        payload: { ...data, scheduled_time: values.time },
      });
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
      setArticle(article);
      // console.log(article);
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
            date: "",
          },
          onSubmit: handleEdit,
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
                    className={buildSelectClassName(props)}
                    name="selectedCategory"
                    optionRemapping={{ label: "name", value: "id" }}
                    options={categories}
                    placeholder={t(
                      "dashboard.articles.actions.edit.category.placeholder"
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
                    style="text"
                    type="button"
                    label={t(
                      "dashboard.articles.actions.edit.versionHistoryButton.label"
                    )}
                    onClick={() => setShowVersionHistory(true)}
                  />
                  {!article.schedule ? (
                    <>
                      <Button
                        className="neeto-ui-text-primary-800"
                        style="link"
                        type="button"
                        label={t(
                          "dashboard.articles.actions.edit.schedule.label"
                        )}
                        onClick={() => setShowScheduleModal(true)}
                      />
                      <Schedule
                        formikProps={props}
                        isScheduled={isScheduled}
                        setIsScheduled={setIsScheduled}
                        setShowScheduleModal={setShowScheduleModal}
                        showScheduleModal={showScheduleModal}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        className="neeto-ui-text-primary-800"
                        label="Update is scheduled"
                        style="text"
                        onClick={() => setShowScheduleDetails(true)}
                      />
                      <ScheduleDetails
                        article={article}
                        refetch={fetchArticleAndCategories}
                        setShowScheduleDetails={setShowScheduleDetails}
                        showScheduleDetails={showScheduleDetails}
                      />
                    </>
                  )}
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
                    isScheduled={isScheduled}
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
        article={article}
        categories={categories}
        refetch={fetchArticleAndCategories}
        setShowVersionHistory={setShowVersionHistory}
        showVersionHistory={showVersionHistory}
      />
    </div>
  );
};

export default Edit;
