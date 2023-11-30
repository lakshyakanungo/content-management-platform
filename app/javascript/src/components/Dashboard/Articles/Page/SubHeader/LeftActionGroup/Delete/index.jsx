import React, { useContext, useState } from "react";

import { t } from "i18next";
import { Delete as DeleteIcon } from "neetoicons";
import { Button } from "neetoui";

import {
  PageContext,
  SelectedArticlesContext,
} from "components/Dashboard/Articles";
import { useBulkDelete } from "hooks/reactQuery/articles/page/useBulkUpdate";

import Alert from "./Alert";

const Delete = () => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { refetch } = useContext(PageContext);
  const { selectedArticleIds, setSelectedArticleIds } = useContext(
    SelectedArticlesContext
  );

  const { mutate: handleBulkDelete } = useBulkDelete({
    refetch,
    setSelectedArticleIds,
  });

  return (
    <>
      <Button
        icon={DeleteIcon}
        size="medium"
        style="danger"
        label={t(
          "dashboard.articles.page.subheader.leftActionGroup.deleteButtonLabel"
        )}
        onClick={() => setShowDeleteAlert(true)}
      />
      <Alert
        handleBulkDelete={handleBulkDelete}
        selectedArticleIds={selectedArticleIds}
        setShowDeleteAlert={setShowDeleteAlert}
        showDeleteAlert={showDeleteAlert}
      />
    </>
  );
};

export default Delete;
