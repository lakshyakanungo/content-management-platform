import { isEditorEmpty } from "@bigbinary/neeto-editor";
import * as yup from "yup";

import i18n from "common/i18n";

export const EDITOR_VALIDATION_SCHEMA = yup.object().shape({
  selectedCategory: yup.object().nullable().required("Category is required"),
  editor: yup
    .string()
    .test(
      "description",
      i18n.t("dashboard.articles.actions.editor.validation"),
      value => !isEditorEmpty(value)
    ),
});

export const STATUS_OPTIONS = [
  { label: "Save as draft", value: "Draft" },
  { label: "Publish", value: "Published" },
];

export const EDITOR_ADDONS = [
  "block-quote",
  "code-block",
  "attachments",
  "undo",
  "redo",
  "text-color",
];

export const EDITOR_MENTIONS = [
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
];
