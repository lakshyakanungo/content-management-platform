import React from "react";

import { FormikEditor } from "@bigbinary/neeto-editor";
import { Input } from "@bigbinary/neetoui/formik";

import { EDITOR_ADDONS, EDITOR_MENTIONS } from "./constants";

const Editor = () => (
  <FormikEditor
    autoFocus
    showImageInMention
    addons={EDITOR_ADDONS}
    className="px-4 mb-2"
    contentClassName="px-16"
    heightStrategy="flexible"
    mentions={EDITOR_MENTIONS}
    name="editor.description"
    placeholder="Add description here."
    rows={25}
  >
    <Input
      nakedInput
      className="px-16 editor-input pt-4"
      name="editor.title"
      placeholder="Add title here."
      rows={1}
    />
  </FormikEditor>
);

export default Editor;
