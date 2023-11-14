import React, { useState } from "react";

import { Button, Pane, Typography } from "@bigbinary/neetoui";

import Details from "./Details";

import { formatDate } from "../../../Page/Table/utils";

const VersionHistory = ({
  article,
  categories,
  showVersionHistory,
  setShowVersionHistory,
  refetch,
}) => {
  const { Header, Body } = Pane;
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  // const [versions, setVersions] = useState([]);
  // // setVersions;
  // console.log(article, "article");
  // console.log(article.versions, "versions");

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
            Version History
          </Typography>
          <Typography className="neeto-ui-text-gray-600">
            Previous versions of <b>{article.title}</b> in Scribble.
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
                    style="text"
                    label={
                      version.event === "restore"
                        ? "Article Restored"
                        : version.object.status === "draft"
                        ? "Article Drafted"
                        : "Article Published"
                    }
                    onClick={() => handleClick(version)}
                  />
                </>
              )}
              {/* <span>Article status action</span> */}
              {/* {console.log("details, ", version.object)} */}
              {/* {console.log(version.object)} */}
              {/* {(console.log(version), "version")} */}
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
