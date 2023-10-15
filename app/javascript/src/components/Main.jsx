import React, { useEffect, useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import {
  // AUTH_ROUTES,
  // PRIVATE_ROUTES,
  DASHBOARD_PATH,
  // LOGIN_PATH,
} from "components/routeConstants";

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
      {/* <ToastContainer /> */}
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
        <Route component={Dashboard} path={DASHBOARD_PATH} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
