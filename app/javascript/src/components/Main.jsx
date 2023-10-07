import React from "react";

import { Route, Switch, BrowserRouter } from "react-router-dom";

import Dashboard from "./Dashboard";

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route component={Dashboard} path="/" />
    </Switch>
  </BrowserRouter>
);

export default Main;
