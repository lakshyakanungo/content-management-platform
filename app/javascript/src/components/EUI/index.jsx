import React, { useState, useEffect } from "react";

import PageLoader from "@bigbinary/neeto-molecules/PageLoader";

import siteSettingsApi from "apis/siteSettings";

import Home from "./Home";
import Login from "./Login";

const EUI = () => {
  const [loading, setLoading] = useState(true);
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [siteName, setSiteName] = useState("");

  const fetchSiteSettings = async () => {
    try {
      const { data } = await siteSettingsApi.fetch();
      const { is_password_protected: siteIsPasswordProtected, title } = data;
      // console.log(data);
      setIsPasswordProtected(siteIsPasswordProtected);
      setSiteName(title);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  if (loading) {
    <div className="h-screen">
      <PageLoader />
    </div>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-full text-center font-bold p-4 text-base border neeto-ui-border-gray-100 neeto-ui-text-gray-800">
        {siteName}
      </div>
      {isPasswordProtected && !isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} siteName={siteName} />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default EUI;
