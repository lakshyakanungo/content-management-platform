import React, { useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Dashboard from "./Dashboard";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <BrowserRouter>
      {/* <Switch> */}
      {/* <Route component={Dashboard} path="/" /> */}
      <Dashboard />
      {/* </Switch> */}
    </BrowserRouter>
  );
};

export default Main;
