import React from "react";

import { HighlightedLine, getLinesFromBody } from "../utils";

const ListItem = ({ text, searchTerm, title }) => {
  const lines = getLinesFromBody({ text, title, searchTerm });

  return (
    <div className="flex flex-col">
      <span className="font-bold">
        <HighlightedLine highlight={searchTerm} line={title} />
      </span>
      {lines.map((line, index) => (
        <span className="neeto-ui-text-gray-600 neeto-ui-text-xs" key={index}>
          <HighlightedLine highlight={searchTerm} line={line} />
        </span>
      ))}
    </div>
  );
};

export default ListItem;
