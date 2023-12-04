import i18n from "common/i18n";

export const STATUS_OPTIONS = [
  { label: i18n.t("dashboard.articles.actions.save.draft"), value: "draft" },
  {
    label: i18n.t("dashboard.articles.actions.save.publish"),
    value: "published",
  },
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
