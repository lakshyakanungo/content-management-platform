import React, { useState, useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import { isPresent } from "utils";

import { setAuthHeaders } from "apis/axios";
import { useFetchSite } from "hooks/reactQuery/endUserInterface/useSiteApi";
import PageLoader from "neetomolecules/PageLoader";
import { getFromLocalStorage } from "utils/storage";

import Home from "./Home";
import Login from "./Login";

const EndUserInterface = () => {
  const [loading, setLoading] = useState(true);
  const { data: site, isFetching } = useFetchSite();

  const authToken = getFromLocalStorage("authToken");
  const isAuthenticated = isPresent(authToken);

  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);

  if (loading || isFetching) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <Switch>
        {site.isPasswordProtected && !isAuthenticated && (
          <Route
            exact
            path="/eui/login"
            render={() => <Login siteName={site.title} />}
          />
        )}
        <Route path="/eui" render={() => <Home siteName={site.title} />} />
      </Switch>
    </div>
  );
};

export default EndUserInterface;
