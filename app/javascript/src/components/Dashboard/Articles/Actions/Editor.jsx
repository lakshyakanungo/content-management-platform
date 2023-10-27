import React from "react";

import { FormikEditor } from "@bigbinary/neeto-editor";
import { t } from "i18next";

import { EDITOR_ADDONS, EDITOR_MENTIONS } from "./constants";

const Editor = ({ editorRef, ...otherProps }) => (
  <FormikEditor
    autoFocus
    showImageInMention
    addons={EDITOR_ADDONS}
    contentClassName="px-40 "
    heightStrategy="flexible"
    mentions={EDITOR_MENTIONS}
    name="editor"
    placeholder={t("dashboard.articles.actions.editorPlaceholder")}
    ref={editorRef}
    rows={25}
    {...otherProps}
  />
);

export default Editor;
