import React, { useState } from "react";

import { Spinner, Switch } from "@bigbinary/neetoui";

import Form from "./Form";

import Layout from "../Layout";

const Security = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);

  setLoading;

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Layout
      className="mx-24"
      description="Configure security related settings for your site."
      header="Security"
    >
      <div className="flex justify-between">
        <span>Password protect your site</span>
        <Switch
          checked={isPasswordRequired}
          onChange={() => setIsPasswordRequired(!isPasswordRequired)}
        />
      </div>
      {isPasswordRequired && <Form />}
    </Layout>
  );
};

export default Security;
