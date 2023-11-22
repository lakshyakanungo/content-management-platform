import React, { useState } from "react";

import { Button, Modal } from "@bigbinary/neetoui";
import { formatDate } from "utils";

import DeleteAlert from "./DeleteAlert";

const Details = ({ article, showScheduleDetails, setShowScheduleDetails }) => {
  const { Header, Body, Footer } = Modal;
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <Modal
      isOpen={showScheduleDetails}
      onClose={() => setShowScheduleDetails(false)}
    >
      <Header>
        <h2>An update is scheduled</h2>
      </Header>
      <Body>
        Article will be updated at {formatDate(article.schedule.time)}
      </Body>
      <Footer>
        <Button
          label="Cancel scheduled update"
          style="danger"
          onClick={() => setShowDeleteAlert(true)}
        />
      </Footer>
      <DeleteAlert
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
    </Modal>
  );
};

export default Details;
