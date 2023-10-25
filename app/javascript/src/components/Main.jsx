import React, { useEffect, useState } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "lib/dayjs"; // eslint-disable-line
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import { DASHBOARD_PATH, EUI_PATH } from "components/routeConstants";

import Dashboard from "./Dashboard";
import EUI from "./EUI";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route component={EUI} path={EUI_PATH} />
        <Route component={Dashboard} path={DASHBOARD_PATH} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
