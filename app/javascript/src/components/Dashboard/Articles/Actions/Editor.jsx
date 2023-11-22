import React from "react";

import { FormikEditor } from "@bigbinary/neeto-editor";
import { useTranslation } from "react-i18next";

import { EDITOR_ADDONS, EDITOR_MENTIONS } from "./constants";

const Editor = ({ editorRef, ...otherProps }) => {
  const { t } = useTranslation();

  return (
    <FormikEditor
      autoFocus
      showImageInMention
      addons={EDITOR_ADDONS}
      contentClassName="px-40 "
      heightStrategy="flexible"
      mentions={EDITOR_MENTIONS}
      name="editor"
      placeholder={t("dashboard.articles.actions.editor.placeholder")}
      ref={editorRef}
      rows={25}
      {...otherProps}
      className="px-4"
    />
  );
};

export default Editor;
