import React from "react";

import { EditorContent } from "@bigbinary/neeto-editor";
import { Modal } from "@bigbinary/neetoui";

const Details = ({ details, showDetails, setShowDetails }) => {
  // console.log(details);
  const { Header, Body, Footer } = Modal;

  return (
    <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
      <Header>Header</Header>
      <Body>
        <EditorContent content={details.object?.body} />
      </Body>
      <Footer>Footer</Footer>
    </Modal>
  );
};

export default Details;
