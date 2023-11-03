import React, { useState, useEffect } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { Route, Switch } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import euiApi from "apis/eui";
import PrivateRoute from "components/commons/PrivateRoute";
import { getFromLocalStorage } from "utils/storage";

import Home from "./Home";
import Login from "./Login";

const EUI = () => {
  const [loading, setLoading] = useState(true);
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [siteName, setSiteName] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);

  const authToken = getFromLocalStorage("authToken");
  const isAuthenticated = !!authToken;

  const fetchSiteSettings = async () => {
    try {
      const {
        data: { eui },
      } = await euiApi.fetch();
      const { isPasswordProtected, title } = eui;
      setIsPasswordProtected(isPasswordProtected);
      setSiteName(title);
    } catch (error) {
      logger.log(error);
    } finally {
      setIsPageLoading(false);
    }
  };

  // TODO: Check/see if setting auth headers is needed here. Try to understand its working.
  useEffect(() => {
    setAuthHeaders(setLoading);
    fetchSiteSettings();
  }, []);

  if (loading || isPageLoading) {
    <div className="h-screen">
      <PageLoader />
    </div>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-full text-center font-bold p-4 text-base border neeto-ui-border-gray-100 neeto-ui-text-gray-800">
        {siteName}
      </div>
      {/* {isPasswordProtected && !isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} siteName={siteName} />
      ) : (
        <Home />
      )} */}
      <Switch>
        <PrivateRoute
          component={Home}
          condition={!isPasswordProtected || isAuthenticated}
          path="/kb"
          redirectRoute="/kb/login"
          siteName={siteName}
        />
        <Route
          exact
          path="/kb/login"
          render={() => <Login siteName={siteName} />}
        />
        <Route exact component={Home} path="/kb" />
      </Switch>
    </div>
  );
};

export default EUI;
