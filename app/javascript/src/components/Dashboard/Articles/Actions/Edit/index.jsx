import React, { useState } from "react";

import dayjs from "dayjs";
import { Spinner, Typography, Button, DatePicker } from "neetoui";
import {
  Form,
  Select as FormikSelect,
  Button as FormikButton,
} from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import {
  useEditArticle,
  useFetchArticle,
} from "hooks/reactQuery/articles/actions/edit/useEditArticleApi";
import { useFetchCategories } from "hooks/reactQuery/category/useCategoriesApi";

import Schedule from "./Schedule";
import VersionHistory from "./VersionHistory";

import ActionDropdown from "../ActionDropdown";
import Editor from "../Editor";
import {
  buildFormValidationSchema,
  buildSelectClassName,
  parseData,
} from "../utils";

const Edit = () => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  const { data: { article = {} } = {}, isFetching: isFetchingArticle } =
    useFetchArticle(id);

  const { data: { categories = [] } = {}, isFetching: isFetchingCategories } =
    useFetchCategories();

  const { mutate: editArticle } = useEditArticle({
    onSuccess: () => history.push("/articles"),
  });

  const { t } = useTranslation();

  const getDefaultCategory = () =>
    categories.find(category => category.id === article.categoryId);

  const handleScheduleChange = ({ time, props }) => {
    props.setFieldValue("time", time);
    setIsScheduled(!!time);
  };

  const handleEdit = ({ selectedCategory, editor, time }) => {
    const data = parseData({
      selectedCategory,
      editor,
      selectedOptionIndex,
    });

    editArticle({
      id,
      payload: { ...data, scheduled_time: time },
    });
  };

  if (isFetchingArticle || isFetchingCategories) {
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
            time: "",
            editor: {
              title: article.title,
              description: article.body,
            },
          },
          onSubmit: handleEdit,
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
                    className={buildSelectClassName()}
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
                    <DatePicker
                      showTime
                      className="w-48"
                      name="time"
                      value={props.values.time}
                      disabledDate={current =>
                        dayjs().add(-1, "days") >= current
                      }
                      placeholder={t(
                        "dashboard.articles.actions.edit.scheduleUpdate.placeholder"
                      )}
                      onChange={time => handleScheduleChange({ time, props })}
                    />
                  ) : (
                    <>
                      <Button
                        className="neeto-ui-text-primary-800"
                        label="Update is scheduled"
                        style="text"
                        onClick={() => setShowSchedule(true)}
                      />
                      <Schedule
                        article={article}
                        setShowSchedule={setShowSchedule}
                        showSchedule={showSchedule}
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
                    article={article}
                    formikProps={props}
                    isScheduled={isScheduled}
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
      <VersionHistory
        article={article}
        categories={categories}
        setShowVersionHistory={setShowVersionHistory}
        showVersionHistory={showVersionHistory}
      />
    </div>
  );
};

export default Edit;
