import React from "react";

import { EditorContent } from "@bigbinary/neeto-editor";
import { Button, Modal } from "@bigbinary/neetoui";
import { Trans, useTranslation } from "react-i18next";

import articlesApi from "apis/articles";

import { renderCategoryName } from "./utils";

const Details = ({
  details,
  showDetails,
  setShowDetails,
  categories,
  setShowVersionHistory,
  refetch,
}) => {
  const { t } = useTranslation();

  const { Header, Body, Footer } = Modal;

  const article = details.object;
  const categoryName = renderCategoryName(article, categories);

  const restoreVersion = async () => {
    try {
      await articlesApi.restore({ id: article.id, versionId: details.id });
      refetch();
      setShowVersionHistory(false);
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
          <h4 className="text-center">
            {t("dashboard.articles.actions.edit.versionHistory.details.title")}
          </h4>
          <span>
            <Trans
              components={[<b key={1} />]}
              i18nKey="dashboard.articles.actions.edit.versionHistory.details.subtitle"
              values={{ name: categoryName }}
            />
          </span>
        </div>
      </Header>
      <Body className="overflow-auto max-h-128">
        <EditorContent content={article?.body} />
      </Body>
      <Footer className="mt-6">
        <Button
          className="mr-2"
          type="button"
          label={t(
            "dashboard.articles.actions.edit.versionHistory.details.button.restore"
          )}
          onClick={restoreVersion}
        />
        <Button
          style="text"
          type="button"
          label={t(
            "dashboard.articles.actions.edit.versionHistory.details.button.cancel"
          )}
          onClick={() => setShowDetails(false)}
        />
      </Footer>
    </Modal>
  );
};

export default Details;
