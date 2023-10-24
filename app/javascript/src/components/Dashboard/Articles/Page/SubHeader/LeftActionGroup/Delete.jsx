import React from "react";

import { Delete as DeleteIcon } from "neetoicons";
import { Button } from "neetoui";

const Delete = ({ handleBulkDelete, selectedArticleIds }) => (
  <Button
    // disabled={!selectedNoteIds.length}
    icon={DeleteIcon}
    label="Delete"
    size="medium"
    style="danger"
    onClick={() => handleBulkDelete(selectedArticleIds)}
  />
);

export default Delete;
