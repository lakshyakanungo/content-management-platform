import React, { useEffect, useState } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import { Button, Toastr } from "@bigbinary/neetoui";
import { saveAs } from "file-saver";

import articlesApi from "apis/articles";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);

  const generatePdf = async () => {
    try {
      await articlesApi.generatePdf();
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      Toastr.success("Downloading report...");
      const response = await articlesApi.download();

      // DOUBT 1 : The response.data is empty if I pass { responseType: "blob" } in the
      // api connector for download action.
      // But still its getting shown in the network. Not able to understand that
      // why is response.data empty then.
      // console.log(response);

      const blob = new Blob([response.data], { type: "application/pdf" });

      // DOUBT 2 : The pdf getting saved is showing up empty.
      //  But still it has the correct size.
      saveAs(blob, "analytics_report.pdf");
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generatePdf();
  }, []);

  const message = isLoading
    ? "Report is being generated..."
    : "Report downloaded!";

  return (
    <Container>
      <h1>{message}</h1>
      <Button label="Download" onClick={downloadPdf} />
    </Container>
  );
};

export default DownloadReport;
