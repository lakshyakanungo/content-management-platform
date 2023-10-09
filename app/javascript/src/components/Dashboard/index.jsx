import React from "react";

import { Route, Switch } from "react-router-dom";

import Sidebar from "components/commons/MySidebar";

import Articles from "./Articles";
import Create from "./Articles/Create";

// import {
//   DASHBOARD_ROUTES,
//   NOTES_PATH,
//   DASHBOARD_PATH,
// } from "components/routeConstants";

const Dashboard = () => (
  <div className="flex h-screen w-full">
    <Sidebar />
    <Switch>
      {/* {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect from={DASHBOARD_PATH} to={NOTES_PATH} /> */}
      <Route exact component={Create} to="/article/new" />
      <Route exact component={Articles} to="/" />
      {/* <Articles /> */}
    </Switch>
  </div>
);

export default Dashboard;
