import React from "react";

import { isEditorEmpty } from "@bigbinary/neeto-editor";
import classNames from "classnames";
import { Check } from "neetoicons";
import { pluck } from "ramda";
import * as yup from "yup";

import i18n from "common/i18n";

import { STATUS_OPTIONS } from "./constants";

export const buildFormValidationSchema = options =>
  yup.object().shape({
    selectedCategory: yup
      .object()
      .shape({
        name: yup.string().oneOf(pluck("name", options)),
        id: yup.string().oneOf(pluck("id", options)),
      })
      .nullable()
      .required(
        i18n.t("dashboard.articles.actions.editor.validation.category")
      ),
    editor: yup.object({
      title: yup
        .string()
        .required(i18n.t("dashboard.articles.actions.editor.validation.title")),
      description: yup
        .string()
        .test(
          "title",
          i18n.t("dashboard.articles.actions.editor.validation.description"),
          value => !isEditorEmpty(value)
        ),
    }),
  });

export const buildSelectClassName = () =>
  classNames(
    "neeto-ui-text-gray-500 neeto-ui-font-normal flex flex-row gap-2 items-center w-72"
  );

export const buildActionItemClassName = ({ selectedOptionIndex, index }) =>
  classNames(
    selectedOptionIndex === index
      ? "neeto-ui-text-gray-800"
      : "neeto-ui-text-gray-700"
  );

export const renderActionItemPrefix = ({ selectedOptionIndex, index }) => (
  <Check
    color={selectedOptionIndex === index ? "#252C32" : "inherit"}
    size={20}
  />
);

export const renderActionDropdownLabel = (selectedOptionIndex, isScheduled) => {
  if (!isScheduled) return STATUS_OPTIONS[selectedOptionIndex].label;

  return selectedOptionIndex === 0 ? "Schedule draft" : "Schedule publish";
};

export const parseData = ({
  selectedCategory,
  editor,
  selectedOptionIndex,
}) => {
  const status = STATUS_OPTIONS[selectedOptionIndex].value;

  return {
    title: editor.title,
    status,
    body: editor.description,
    category_id: selectedCategory.id,
  };
};
