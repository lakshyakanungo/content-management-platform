import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button } from "neetoui";

import { INITIAL_REDIRECTIONS } from "./constants";
import FormRow from "./FormRow";
import Row from "./Row";

import Layout from "../Layout";

const Redirection = () => {
  const [redirections, setRedirections] = useState(INITIAL_REDIRECTIONS);
  const [showNewRedirection, setShowNewRedirection] = useState(false);
  const [editingRow, setEditingRow] = useState("");

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
          <span className="" />
        </div>
        <div>
          {redirections.map(redirection =>
            editingRow === redirection.id ? (
              <FormRow
                data={redirection}
                key={redirection.id}
                setRedirections={setRedirections}
                // setShowNewRedirection={setShowNewRedirection}
                onCollapse={() => {}}
              />
            ) : (
              <Row
                key={redirection.id}
                redirection={redirection}
                setEditingRow={setEditingRow}
              />
            )
          )}
        </div>
        {showNewRedirection && (
          <FormRow
            setRedirections={setRedirections}
            data={{
              fromUrl: "",
              toUrl: "",
            }}
            onCollapse={() => setShowNewRedirection(true)}
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
