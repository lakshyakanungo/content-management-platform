import React from "react";

import { EditorContent } from "@bigbinary/neeto-editor";
import { Button, Modal } from "@bigbinary/neetoui";
import { Trans, useTranslation } from "react-i18next";

import articlesApi from "apis/articles";

import { renderCategoryName } from "./utils";

const Details = ({
  version,
  showVersionDetails,
  setShowVersionDetails,
  categories,
  setShowVersionHistory,
  refetch,
}) => {
  const { t } = useTranslation();

  const { Header, Body, Footer } = Modal;

  const isCurrentVersion = !version.object;
  const article = isCurrentVersion ? version : version.object;

  const categoryName = renderCategoryName(article, categories);

  const restoreVersion = async () => {
    try {
      await articlesApi.restore({ id: article.id, versionId: version.id });
      refetch();
      setShowVersionHistory(false);
    } catch (error) {
      logger.log(error);
    }
  };

  return (
    <Modal
      className="mx-auto min-w-65"
      isOpen={showVersionDetails}
      size="large"
      onClose={() => setShowVersionDetails(false)}
    >
      <Header>
        <div className="flex flex-col">
          <h4 className="text-center">
            {t("dashboard.articles.actions.edit.versionHistory.details.title")}
          </h4>
          {categoryName ? (
            <span>
              <Trans
                components={[<b key={1} />]}
                i18nKey="dashboard.articles.actions.edit.versionHistory.details.subtitle"
                values={{ name: categoryName }}
              />
            </span>
          ) : (
            <span className="neeto-ui-text-error-500">
              {t(
                "dashboard.articles.actions.edit.versionHistory.details.categoryDeleted"
              )}
            </span>
          )}
        </div>
      </Header>
      <Body className="overflow-auto max-h-128">
        <h2>{article.title}</h2>
        <EditorContent content={article.body} />
      </Body>
      {!isCurrentVersion && categoryName && (
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
            onClick={() => setShowVersionDetails(false)}
          />
        </Footer>
      )}
    </Modal>
  );
};

export default Details;
