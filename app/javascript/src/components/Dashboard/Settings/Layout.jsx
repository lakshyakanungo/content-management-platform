import React from "react";

import Container from "@bigbinary/neeto-molecules/Container";

const Layout = ({ header = "", description = "", children }) => (
  <Container>
    <div className="flex flex-col gap-4 mx-24 mt-24">
      <div className="flex flex-col">
        <h2 className="font-normal neeto-ui-text-gray-800 ">{header}</h2>
        <span className="text-base neeto-ui-text-gray-600">{description}</span>
      </div>
      {children}
    </div>
  </Container>
);

export default Layout;
