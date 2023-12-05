import React from "react";

import { FormikEditor } from "neetoeditor";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { EDITOR_ADDONS, EDITOR_MENTIONS } from "./constants";

const Editor = () => {
  const { t } = useTranslation();

  return (
    <FormikEditor
      autoFocus
      showImageInMention
      addons={EDITOR_ADDONS}
      className="px-4 mb-2"
      contentClassName="px-16"
      heightStrategy="flexible"
      mentions={EDITOR_MENTIONS}
      name="editor.description"
      rows={25}
      placeholder={t(
        "dashboard.articles.actions.editor.placeholder.description"
      )}
    >
      <Input
        nakedInput
        className="px-16 editor-input pt-4"
        name="editor.title"
        placeholder={t("dashboard.articles.actions.editor.placeholder.title")}
        rows={1}
      />
    </FormikEditor>
  );
};

export default Editor;
