import React from "react";

import { FormikEditor } from "@bigbinary/neeto-editor";
import { Button } from "@bigbinary/neetoui";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";

import { EDITOR_ADDONS, EDITOR_MENTIONS } from "./constants";

const CreateEditor = React.forwardRef((props, editorRef) => {
  // const { t } = useTranslation();
  const DocumentWithTitle = Document.extend({
    content: "title para block+",
  });

  const Title = Heading.extend({
    name: "title",
    group: "title",
    parseHTML: () => [{ tag: "h1:first-child" }],
  }).configure({ levels: [1] });

  const Para = Paragraph.extend({
    name: "para",
    group: "para",
    parseHTML: () => [{ tag: "p:first-child" }],
  });

  const handleClick = () => editorRef.current.editor.commands.focus("start");
  // useEffect(() => {
  //   handleClick();
  // }, []);

  // TODO: Refactor code for editor and check if its working with edit page also.
  // Add translations too.
  // Also ask if the requirement in correct. Or it needs to be changed.
  return (
    <>
      <FormikEditor
        autoFocus
        showImageInMention
        addons={EDITOR_ADDONS}
        contentClassName="px-40 "
        heightStrategy="flexible"
        mentions={EDITOR_MENTIONS}
        name="editor"
        // placeholder={t("dashboard.articles.actions.editor.placeholder")}
        ref={editorRef}
        rows={25}
        {...props}
        className="px-4"
        // content={"<h1></h1><h2></h2>"}
        extensions={[
          DocumentWithTitle,
          Para,
          Paragraph,
          Text,
          Title,
          Heading,
          Placeholder.configure({
            showOnlyCurrent: false,
            placeholder: ({ node }) => {
              if (node.type.name === "title") {
                return "Add title here";
              }
              // else if (node.type.name === "para") {
              //   return "Add description here";
              // }

              return "Add description here";
            },
          }),
        ]}
      />
      <Button type="button" onClick={handleClick} />
    </>
  );
});

CreateEditor.displayName = "CreateEditor";

export default CreateEditor;
