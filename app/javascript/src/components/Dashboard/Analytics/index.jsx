import React, { useState } from "react";

import Header from "@bigbinary/neeto-molecules/Header";
import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import { Button, Spinner, Table } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { ANALYTICS_REPORT_PATH } from "components/routeConstants";
import { useFetchArticleAnalytics } from "hooks/reactQuery/analytics/useAnalytics";

import { buildColumnData, buildRowClassName } from "./utils";

const Analytics = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const { t } = useTranslation();

  const history = useHistory();

  const { data, isLoading } = useFetchArticleAnalytics({
    currentPageNumber,
  });

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-8 my-4 w-full">
      <Header className="" title={t("dashboard.analytics.title")} />
      <SubHeader
        rightActionBlock={
          <Button
            label={t("dashboard.analytics.download")}
            onClick={() => history.push(ANALYTICS_REPORT_PATH)}
          />
        }
      />
      <Table
        preserveTableStateInQuery
        className="px-2"
        columnData={buildColumnData}
        currentPageNumber={currentPageNumber}
        defaultPageSize={9}
        handlePageChange={page => setCurrentPageNumber(page)}
        rowClassName={buildRowClassName}
        rowData={data.articles}
        totalCount={data.totalCount}
        onChange={pagination => setCurrentPageNumber(pagination.current)}
      />
    </div>
  );
};

export default Analytics;
