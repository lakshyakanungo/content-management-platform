import React from "react";

import classNames from "classnames";
import { Check } from "neetoicons";

import { STATUS_OPTIONS } from "./constants";

const extractTitle = jsonOfEditorContent =>
  jsonOfEditorContent.content[0].content[0].text;

export const buildSelectClassName = props =>
  classNames(
    "neeto-ui-text-gray-500 neeto-ui-font-normal flex flex-row gap-2 items-center",
    {
      "w-72": props.isValid,
      "w-96": !props.isValid,
    }
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

export const parseData = ({
  selectedCategory,
  editorRef,
  selectedOptionIndex,
}) => {
  const body = editorRef.current.editor.getHTML();
  const jsonOfContent = editorRef.current.editor.getJSON();
  const title = extractTitle(jsonOfContent);
  const status = STATUS_OPTIONS[selectedOptionIndex].value;

  return { title, status, body, category_id: selectedCategory.id };
};

// export const parseDataForSchedule = ({
//   editorRef,
//   selectedCategory,
//   scheduleTime,
//   status,
// }) => {
//   const body = editorRef.current.editor.getHTML();
//   const jsonOfContent = editorRef.current.editor.getJSON();
//   const title = extractTitle(jsonOfContent);
// };
