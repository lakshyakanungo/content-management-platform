import React from "react";

import { Route } from "react-router-dom";

import Articles from "./Articles";

// import {
//   DASHBOARD_ROUTES,
//   NOTES_PATH,
//   DASHBOARD_PATH,
// } from "components/routeConstants";

const Dashboard = () => (
  <div className="flex h-screen w-full">
    {/* <MySidebar /> */}
    {/* <Switch> */}
    {/* {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Redirect from={DASHBOARD_PATH} to={NOTES_PATH} /> */}
    <Route component={Articles} to="/" />
    {/* <Articles /> */}
    {/* </Switch> */}
  </div>
);

export default Dashboard;
