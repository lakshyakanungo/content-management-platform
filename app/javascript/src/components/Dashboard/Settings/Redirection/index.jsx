import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Button, Spinner } from "neetoui";
import { useTranslation } from "react-i18next";

import { useFetchRedirections } from "hooks/reactQuery/settings/redirection/useRedirectionsApi";

import FormRow from "./FormRow";
import Row from "./Row";

import Layout from "../Layout";

const Redirection = () => {
  const [showNewRedirection, setShowNewRedirection] = useState(false);
  const [editingRow, setEditingRow] = useState("");

  const { data: { redirections = [] } = {}, isFetching } =
    useFetchRedirections();

  const { t } = useTranslation();

  if (isFetching) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Layout
      className="mx-24"
      description={t("dashboard.settings.redirections.description")}
      header={t("dashboard.settings.redirections.header")}
    >
      <div className="neeto-ui-bg-pastel-blue flex flex-col px-6 py-8 gap-2 ">
        <div className="grid grid-cols-12 gap-2 justify-between neeto-ui-text-gray-600 neeto-ui-font-semibold neeto-ui-text-xs">
          <span className="col-span-5">
            {t("dashboard.settings.redirections.from")}
          </span>
          <span className="col-span-5">
            {t("dashboard.settings.redirections.to")}
          </span>
          <span />
        </div>
        <div>
          {redirections.map(redirection =>
            editingRow === redirection.id ? (
              <FormRow
                isEdit
                data={redirection}
                key={redirection.id}
                redirections={redirections}
                handleClose={() => {
                  setEditingRow("");
                }}
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
            handleClose={() => setShowNewRedirection(false)}
            redirections={redirections}
          />
        )}
        <div>
          <Button
            className="mt-2"
            disabled={showNewRedirection || editingRow !== ""}
            icon={Plus}
            iconPosition="left"
            label={t("dashboard.settings.redirections.newButtonLabel")}
            style="link"
            onClick={() => setShowNewRedirection(true)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Redirection;
