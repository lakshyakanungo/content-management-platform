import React, { useState } from "react";

import { Button, Pane, Typography } from "@bigbinary/neetoui";
import { Trans, useTranslation } from "react-i18next";
import { formatDate } from "utils";

import Details from "./Details";
import { buildButtonLabel, buildCurrentVersionLabel } from "./utils";

const VersionHistory = ({
  article,
  categories,
  showVersionHistory,
  setShowVersionHistory,
  refetch,
}) => {
  const [version, setVersion] = useState({});
  const [showVersionDetails, setShowVersionDetails] = useState(false);

  const { Header, Body } = Pane;

  const { t } = useTranslation();

  const handleClick = version => {
    setVersion(version);
    setShowVersionDetails(true);
  };

  return (
    <>
      <Pane
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
      >
        <Header>
          <Typography className="mb-2" style="h2" weight="semibold">
            {t("dashboard.articles.actions.edit.versionHistory.title")}
          </Typography>
          <Typography className="neeto-ui-text-gray-600">
            <Trans
              components={[<b key={1} />]}
              i18nKey="dashboard.articles.actions.edit.versionHistory.subtitle"
              values={{ title: article.title }}
            />
          </Typography>
        </Header>
        <Body className="w-full">
          <div className="neeto-ui-bg-primary-100 p-2 flex flex-col neeto-ui-rounded-sm">
            <div className="flex flex-row gap-3 items-center">
              <span>{formatDate(article.updatedAt)}</span>
              <Button
                className="neeto-ui-text-primary-600 capitalize"
                label={buildCurrentVersionLabel(article)}
                style="text"
                onClick={() => handleClick(article)}
              />
            </div>
            <span className="neeto-ui-text-primary-600 italic w-full ml-4">
              {t("dashboard.articles.actions.edit.versionHistory.current")}
            </span>
          </div>
          {article.versions.toReversed().map(version => (
            <div
              className="flex flex-row gap-3 items-center py-1 px-2"
              key={version.id}
            >
              {version.object && (
                <>
                  <span>{formatDate(version.object.updatedAt)}</span>
                  <Button
                    className="neeto-ui-text-primary-600"
                    label={buildButtonLabel(version)}
                    style="text"
                    onClick={() => handleClick(version)}
                  />
                </>
              )}
            </div>
          ))}
        </Body>
      </Pane>
      {showVersionDetails && (
        <Details
          categories={categories}
          refetch={refetch}
          setShowVersionDetails={setShowVersionDetails}
          setShowVersionHistory={setShowVersionHistory}
          showVersionDetails={showVersionDetails}
          version={version}
        />
      )}
    </>
  );
};

export default VersionHistory;
