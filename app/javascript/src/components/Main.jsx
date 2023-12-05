import React, { useEffect, useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "lib/dayjs"; // eslint-disable-line
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import "common/i18n";
import { initializeLogger } from "common/logger";
import { DASHBOARD_PATH, EUI_PATH } from "components/routeConstants";
import PageLoader from "neetomolecules/PageLoader";
import { setToLocalStorage } from "utils/storage";

import Dashboard from "./Dashboard";
import EUI from "./EndUserInterface";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    setToLocalStorage("authUserId", 1);
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
