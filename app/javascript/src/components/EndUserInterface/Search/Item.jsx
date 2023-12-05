import React from "react";

import { getLinesFromBody, renderHighlightedLine } from "../utils";

const ListItem = ({ text, searchTerm, title }) => {
  const lines = getLinesFromBody({ text, searchTerm });

  return (
    <div className="flex flex-col">
      <span className="font-bold">
        {renderHighlightedLine({ line: title, highlight: searchTerm })}
      </span>
      {lines.map((line, index) => (
        <span className="neeto-ui-text-gray-600 neeto-ui-text-xs" key={index}>
          {renderHighlightedLine({ line, highlight: searchTerm })}
        </span>
      ))}
    </div>
  );
};

export default ListItem;
