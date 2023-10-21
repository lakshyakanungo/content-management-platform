import React, { useEffect, useState } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import {
  // AUTH_ROUTES,
  // PRIVATE_ROUTES,
  DASHBOARD_PATH,
  EUI_PATH,
  // LOGIN_PATH,
} from "components/routeConstants";

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
      <div className="h-screen w-screen max-w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        {/* {AUTH_ROUTES.map(route => (
          <Route
            exact
            component={route.component}
            key={route.path}
            path={route.path}
          />
        ))} */}
        {/* {!isLoggedIn && <Route exact component={Hero} path={DASHBOARD_PATH} />} */}
        {/* {PRIVATE_ROUTES.map(route => (
          <PrivateRoute
            component={route.component}
            condition={isLoggedIn}
            key={route.path}
            path={route.path}
            redirectRoute={LOGIN_PATH}
          />
        ))} */}
        <Route component={EUI} path={EUI_PATH} />
        <Route component={Dashboard} path={DASHBOARD_PATH} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
