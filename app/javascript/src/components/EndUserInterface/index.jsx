import React, { useState, useEffect } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";
import { Route, Switch } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import siteApi from "apis/site";
import { getFromLocalStorage } from "utils/storage";

import Home from "./Home";
import Login from "./Login";

const EndUserInterface = () => {
  const [loading, setLoading] = useState(true);
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [siteName, setSiteName] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);

  const authToken = getFromLocalStorage("authToken");
  const isAuthenticated = !!authToken;

  const fetchSite = async () => {
    try {
      const {
        data: { isPasswordProtected, title },
      } = await siteApi.fetch();
      setIsPasswordProtected(isPasswordProtected);
      setSiteName(title);
    } catch (error) {
      logger.log(error);
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    setAuthHeaders(setLoading);
    fetchSite();
  }, []);

  if (loading || isPageLoading) {
    <div className="h-screen">
      <PageLoader />
    </div>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <Switch>
        {isPasswordProtected && !isAuthenticated && (
          <Route
            exact
            path="/eui/login"
            render={() => <Login siteName={siteName} />}
          />
        )}
        <Route path="/eui" render={() => <Home siteName={siteName} />} />
      </Switch>
    </div>
  );
};

export default EndUserInterface;
