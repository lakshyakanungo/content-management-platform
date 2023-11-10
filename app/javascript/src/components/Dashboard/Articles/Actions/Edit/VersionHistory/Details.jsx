import React from "react";

import { EditorContent } from "@bigbinary/neeto-editor";
import { Button, Modal } from "@bigbinary/neetoui";

import articlesApi from "apis/articles";

const Details = ({ details, showDetails, setShowDetails, categoryName }) => {
  // console.log(details, "details");
  const { Header, Body, Footer } = Modal;

  const article = details.object;

  const restoreVersion = async () => {
    try {
      await articlesApi.restore({ id: article.id, versionId: details.id });
      setShowDetails(false);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <Modal
      className="mx-auto w-9/12"
      isOpen={showDetails}
      size="large"
      onClose={() => setShowDetails(false)}
    >
      <Header>
        <div className="flex flex-col">
          <h4 className="text-center">Version History</h4>
          <span>
            Category: <b>{categoryName}</b>
          </span>
        </div>
      </Header>
      <Body className="overflow-auto max-h-128">
        <EditorContent content={article?.body} />
      </Body>
      <Footer className="mt-6">
        <Button
          className="mr-2"
          label="Restore version"
          type="button"
          onClick={restoreVersion}
        />
        <Button
          label="Cancel"
          style="text"
          type="button"
          onClick={() => setShowDetails(false)}
        />
      </Footer>
    </Modal>
  );
};

export default Details;
