import React, { useState } from "react";

import { Button, Pane, Typography } from "@bigbinary/neetoui";
import { Trans, useTranslation } from "react-i18next";
import { formatDate } from "utils";

import Details from "./Details";
import { buildButtonLabel } from "./utils";

const VersionHistory = ({
  article,
  categories,
  showVersionHistory,
  setShowVersionHistory,
  refetch,
}) => {
  const [details, setDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const { Header, Body } = Pane;

  const { t } = useTranslation();

  const handleClick = version => {
    setDetails(version);
    setShowDetails(true);
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
        <Body>
          {article.versions.map(version => (
            <div
              className="flex flex-row gap-3 items-center py-1"
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
      {showDetails && (
        <Details
          categories={categories}
          details={details}
          refetch={refetch}
          setShowDetails={setShowDetails}
          setShowVersionHistory={setShowVersionHistory}
          showDetails={showDetails}
        />
      )}
    </>
  );
};

export default VersionHistory;
