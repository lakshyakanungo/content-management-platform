import React, { useState } from "react";

import { Button, Pane, Typography } from "@bigbinary/neetoui";

import Details from "./Details";

import { formatDate } from "../../../Page/Table/utils";

const VersionHistory = ({
  versions,
  showVersionHistory,
  setShowVersionHistory,
}) => {
  const { Header, Body } = Pane;
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});
  // const [versions, setVersions] = useState([]);
  // setVersions;

  const handleClick = version => {
    setShowDetails(true);
    setDetails(version);
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
            Version history of article in Scribble.
          </Typography>
        </Header>
        <Body>
          {versions.map(version => (
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
                      version.object.status === "draft"
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
      <Details
        details={details}
        setShowDetails={setShowDetails}
        showDetails={showDetails}
      />
    </>
  );
};

export default VersionHistory;
