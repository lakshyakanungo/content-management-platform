import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Button, Spinner } from "neetoui";

import redirectionsApi from "apis/redirections";

import FormRow from "./FormRow";
import Row from "./Row";

import Layout from "../Layout";

const Redirection = () => {
  const [redirections, setRedirections] = useState([]);
  const [showNewRedirection, setShowNewRedirection] = useState(false);
  const [editingRow, setEditingRow] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRedirections = async () => {
    try {
      setLoading(true);
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setRedirections(redirections);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

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
      description="Create and configure redirection rules to send users from old links to new links. All redirections are performed with 301 status codes to be SEO friendly."
      header="Redirections"
    >
      <div className="neeto-ui-bg-pastel-blue flex flex-col px-6 py-8 gap-2 ">
        <div className="grid grid-cols-12 gap-2 justify-between neeto-ui-text-gray-600 neeto-ui-font-semibold neeto-ui-text-xs">
          <span className="col-span-5">FROM</span>
          <span className="col-span-5">TO</span>
          <span />
        </div>
        <div>
          {redirections.map(redirection =>
            editingRow === redirection.id ? (
              <FormRow
                isEdit
                data={redirection}
                fetchRedirections={fetchRedirections}
                key={redirection.id}
                onCollapse={() => {
                  setEditingRow("");
                }}
              />
            ) : (
              <Row
                fetchRedirections={fetchRedirections}
                key={redirection.id}
                redirection={redirection}
                setEditingRow={setEditingRow}
              />
            )
          )}
        </div>
        {showNewRedirection && (
          <FormRow
            fetchRedirections={fetchRedirections}
            onCollapse={() => setShowNewRedirection(false)}
          />
        )}
        <div>
          <Button
            className="mt-2"
            disabled={showNewRedirection}
            icon={Plus}
            iconPosition="left"
            label="Add new redirection"
            style="link"
            onClick={() => setShowNewRedirection(true)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Redirection;
