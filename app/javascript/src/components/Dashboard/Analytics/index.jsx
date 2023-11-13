import React, { useEffect, useState } from "react";

import Header from "@bigbinary/neeto-molecules/Header";
import { Spinner, Table } from "@bigbinary/neetoui";

import articlesApi from "apis/articles";

import { buildColumnData, buildRowClassName } from "./utils";

const Analytics = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await articlesApi.analytics();
      setArticles(articles);
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-8 my-4">
      <Header className="" title="Analytics" />
      <Table
        className="px-2"
        columnData={buildColumnData}
        currentPageNumber={currentPageNumber}
        defaultPageSize={10}
        handlePageChange={page => setCurrentPageNumber(page)}
        rowClassName={buildRowClassName}
        rowData={articles}
      />
    </div>
  );
};

export default Analytics;
