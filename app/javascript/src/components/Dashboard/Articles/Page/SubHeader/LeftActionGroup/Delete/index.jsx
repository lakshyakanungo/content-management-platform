import React, { useState } from "react";

import { t } from "i18next";
import { Delete as DeleteIcon } from "neetoicons";
import { Button } from "neetoui";

import { useBulkDelete } from "hooks/reactQuery/articles/page/useBulkUpdateArticlesApi";
import { useSelectedArticlesStore } from "hooks/zustand/useSelectedArticlesStore";

import Alert from "./Alert";

const Delete = () => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const { selectedArticleIds, setSelectedArticleIds } =
    useSelectedArticlesStore();

  const { mutate: handleBulkDelete } = useBulkDelete({
    onSuccess: () => setSelectedArticleIds([]),
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
