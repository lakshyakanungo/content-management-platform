import React from "react";

import classNames from "classnames";
import { Check } from "neetoicons";

import { STATUS_OPTIONS } from "./constants";

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
