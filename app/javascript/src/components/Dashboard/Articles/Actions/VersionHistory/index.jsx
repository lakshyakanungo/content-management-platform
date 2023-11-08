import React, { useState } from "react";

import { Pane, Typography } from "@bigbinary/neetoui";

const VersionHistory = ({ showVersionHistory, setShowVersionHistory }) => {
  const { Header, Body } = Pane;
  const [versions, setVersions] = useState([]);
  setVersions;

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
          <div className="flex flex-row" key={version.id}>
            <span>Date</span>
            <span>Article status action</span>
          </div>
        ))}
      </Body>
    </Pane>
  );
};

export default VersionHistory;
