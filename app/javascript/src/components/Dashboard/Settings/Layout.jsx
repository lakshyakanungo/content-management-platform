import React from "react";

import Container from "@bigbinary/neeto-molecules/Container";

import { buildLayoutClassName } from "./utils";

const Layout = ({
  header = "",
  description = "",
  className = "",
  children,
}) => (
  <Container>
    <div className={buildLayoutClassName(className)}>
      <div className="flex flex-col">
        <h2 className="font-normal neeto-ui-text-gray-800 ">{header}</h2>
        <span className="text-base neeto-ui-text-gray-600">{description}</span>
      </div>
      {children}
    </div>
  </Container>
);

export default Layout;
