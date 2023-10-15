import React from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import classNames from "classnames";

const Layout = ({
  header = "",
  description = "",
  className = "",
  children,
}) => {
  const containerClassName = classNames(
    className,
    " flex flex-col gap-4 mt-24"
  );

  return (
    <Container>
      <div className={containerClassName}>
        <div className="flex flex-col">
          <h2 className="font-normal neeto-ui-text-gray-800 ">{header}</h2>
          <span className="text-base neeto-ui-text-gray-600">
            {description}
          </span>
        </div>
        {children}
      </div>
    </Container>
  );
};

export default Layout;
