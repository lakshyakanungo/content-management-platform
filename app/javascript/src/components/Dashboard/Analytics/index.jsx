import React, { useEffect, useState } from "react";

import Header from "@bigbinary/neeto-molecules/Header";
import SubHeader from "@bigbinary/neeto-molecules/SubHeader";
import { Button, Spinner, Table } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import articlesApi from "apis/articles";
import { ANALYTICS_REPORT_PATH } from "components/routeConstants";

import { buildColumnData, buildRowClassName } from "./utils";

const Analytics = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const { t } = useTranslation();

  const history = useHistory();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles, totalCount },
      } = await articlesApi.analytics(currentPageNumber);
      setArticles(articles);
      setTotalArticles(totalCount);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPageNumber]);

  if (loading) {
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
          // TODO: Add this to translation
          <Button
            label="Download report"
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
        rowData={articles}
        totalCount={totalArticles}
        onChange={pagination => setCurrentPageNumber(pagination.current)}
      />
    </div>
  );
};

export default Analytics;
