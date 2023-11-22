import React from "react";

import { FormikEditor } from "@bigbinary/neeto-editor";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";

import { EDITOR_ADDONS, EDITOR_MENTIONS } from "./constants";

const Editor = ({ editorRef, ...otherProps }) => {
  // const { t } = useTranslation();

  const DocumentWithTitle = Document.extend({
    content: "title block+",
  });

  const Title = Heading.extend({
    name: "title",
    group: "title",
    parseHTML: () => [{ tag: "h1:first-child" }],
  }).configure({ levels: [1] });

  return (
    <FormikEditor
      autoFocus
      showImageInMention
      addons={EDITOR_ADDONS}
      contentClassName="px-40 "
      heightStrategy="flexible"
      mentions={EDITOR_MENTIONS}
      name="editor"
      // placeholder={t("dashboard.articles.actions.editor.placeholder")}
      // placeholder={`Add title here\nAdd description here`}
      ref={editorRef}
      rows={25}
      {...otherProps}
      className="px-4"
      extensions={[
        Placeholder.configure({
          placeholder: "My Custom Placeholder",
        }),
        DocumentWithTitle,
        Title,
        Heading,
      ]}
    />
  );
};

export default Editor;
