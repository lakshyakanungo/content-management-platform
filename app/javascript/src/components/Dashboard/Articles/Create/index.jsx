import React, { useRef } from "react";

// import Container from "@bigbinary/neeto-molecules/Container";
import { Editor } from "@bigbinary/neeto-editor";
import Header from "@bigbinary/neeto-molecules/Header";
import { ActionDropdown, Button, Select } from "@bigbinary/neetoui";

const Create = () => {
  const { Menu, MenuItem } = ActionDropdown;

  const editorRef = useRef(null);

  const handleClick = () => {
    const htmlOfEditorContent = editorRef.current.editor.getHTML;
    // console.log(`${htmlOfEditorContent}`);
    logger.log(htmlOfEditorContent);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header
        className="px-4"
        actionBlock={
          <>
            <Button label="Cancel" style="secondary" type="button" />
            <ActionDropdown
              // appendTo={() => document.body}
              // buttonStyle="text"
              // icon={() => <MenuHorizontal size={20} />}
              // strategy="fixed"
              label="Publish"
            >
              <Menu>
                <MenuItem.Button>Publish</MenuItem.Button>
                <MenuItem.Button>Save as Draft</MenuItem.Button>
              </Menu>
            </ActionDropdown>
          </>
        }
        title={
          <div className="w-72">
            <Select
              isSearchable
              className="w-full neeto-ui-text-gray-500 neeto-ui-font-normal"
              placeholder="Search category"
              options={[
                {
                  label: "Category 1",
                  value: "value 1",
                },
                {
                  label: "Category 2",
                  value: "value 2",
                },
                {
                  label: "Category 3",
                  value: "value 3",
                },
                {
                  label: "Category 4",
                  value: "value 4",
                },
              ]}
              // className=""
            />
          </div>
        }
      />
      <Editor
        autoFocus
        showImageInMention
        // className="flex-grow --neeto-ui-rounded-none"
        contentClassName="px-8 "
        heightStrategy="flexible"
        ref={editorRef}
        rows={25}
        addons={[
          "block-quote",
          "code-block",
          "attachments",
          "undo",
          "redo",
          "text-color",
        ]}
        initialValue={`<div>
        <h1 style="color:#49545C">Add title here.</h1>
        <p>Add description</p>
        </div>`}
        mentions={[
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
        ]}
      />
      <Button className="w-20" onClick={handleClick}>
        Get Html
      </Button>
    </div>
  );
};

export default Create;
