import React, { useEffect, useState } from "react";

import Header from "@bigbinary/neeto-molecules/Header";
import { Spinner, Table } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";

import { buildColumnData, buildRowClassName } from "./utils";

const Analytics = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [orderBy, setOrderBy] = useState("descend");
  const [totalArticles, setTotalArticles] = useState(0);

  const { t } = useTranslation();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles, totalCount },
      } = await articlesApi.analytics(currentPageNumber, orderBy);
      setArticles(articles);
      setTotalArticles(totalCount);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination, sorter) => {
    setCurrentPageNumber(pagination.current);
    if (sorter.order && orderBy !== sorter.order) {
      setOrderBy(sorter.order);
      setCurrentPageNumber(1);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPageNumber, orderBy]);

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
        onChange={(pagination, _, sorter) =>
          handleTableChange(pagination, sorter)
        }
      />
    </div>
  );
};

export default Analytics;
