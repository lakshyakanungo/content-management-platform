import React, { useEffect, useState } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import { Button } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import articlesApi from "apis/articles";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import ProgressBar from "components/commons/ProgressBar";
import { useGeneratePdf } from "hooks/reactQuery/analytics/useAnalytics";

import { DOWNLOAD_READY_MESSAGE } from "./constants";
import { savePdf } from "./utils";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const { mutate: generatePdf } = useGeneratePdf();

  const consumer = createConsumer();

  const { t } = useTranslation();

  const downloadPdf = async () => {
    setIsLoading(true);
    try {
      const response = await articlesApi.download();
      savePdf(response.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false);
      setMessage(DOWNLOAD_READY_MESSAGE);
    }
  }, [progress]);

  return (
    <Container>
      <div className="mx-auto mt-48 w-3/6 space-y-6 rounded-md border-2 p-4 text-center">
        <h1>{message}</h1>
        <ProgressBar progress={progress} />
        <Button
          disabled={isLoading}
          label={t("dashboard.analytics.report.download")}
          loading={isLoading}
          onClick={downloadPdf}
        />
      </div>
    </Container>
  );
};

export default DownloadReport;
