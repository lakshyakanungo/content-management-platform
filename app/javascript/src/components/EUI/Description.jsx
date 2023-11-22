import React from "react";

const Description = ({ text, searchTerm, title }) => {
  const getHighlightedLine = (line, highlight) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = line.split(new RegExp(`(${searchTerm})`, "gi"));

    return (
      <span>
        {parts.map((part, index) => (
          <span
            key={index}
            // style={
            //   part.toLowerCase() === highlight.toLowerCase()
            //     ? { fontWeight: "bold" }
            //     : {}
            // }
          >
            {part.toLowerCase() === highlight.toLowerCase() ? (
              <mark className="bg-amber-400">{part}</mark>
            ) : (
              part
            )}
          </span>
        ))}
      </span>
    );
  };

  const body = text.split(title)[1];
  const lines = body.split(".");
  const matchingLines = lines
    .filter(line => line.includes(searchTerm))
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      <span className="font-bold">{getHighlightedLine(title, searchTerm)}</span>
      {matchingLines.map((line, index) => (
        <span className="neeto-ui-text-gray-600 neeto-ui-text-xs" key={index}>
          {getHighlightedLine(line, searchTerm)}
        </span>
      ))}
    </div>
  );
};

export default Description;
