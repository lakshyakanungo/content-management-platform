import React from "react";

import { Pane, Typography } from "@bigbinary/neetoui";

import { formatDate } from "../../Page/Table/utils";

const VersionHistory = ({
  versions,
  showVersionHistory,
  setShowVersionHistory,
}) => {
  const { Header, Body } = Pane;
  // const [versions, setVersions] = useState([]);
  // setVersions;

  return (
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
          <div className="flex flex-row gap-3" key={version.id}>
            {version.object && (
              <>
                <span>{formatDate(version.object.updatedAt)}</span>
                <span>
                  {version.object.status === "draft"
                    ? "Article Drafted"
                    : "Article Published"}
                </span>
              </>
            )}
            {/* <span>Article status action</span> */}
            {/* {console.log("details, ", version.object)} */}
            {/* {console.log(version.object)} */}
          </div>
        ))}
      </Body>
    </Pane>
  );
};

export default VersionHistory;
