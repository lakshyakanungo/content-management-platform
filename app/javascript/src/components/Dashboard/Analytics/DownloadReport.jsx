import React, { useEffect, useState } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import { Button, Toastr } from "@bigbinary/neetoui";

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

  function solution1(base64Data) {
    const arrBuffer = base64ToArrayBuffer(base64Data);

    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    const newBlob = new Blob([arrBuffer], { type: "application/pdf" });

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);

      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);

    const link = document.createElement("a");
    document.body.appendChild(link); //required in FF, optional for Chrome
    link.href = data;
    link.download = "analytics_report.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
  }

  function base64ToArrayBuffer(data) {
    const binaryString = window.atob(data);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }

    return bytes;
  }

  const downloadPdf = async () => {
    try {
      Toastr.success("Downloading report...");
      const response = await articlesApi.download();

      // DOUBT 1 : The response.data is empty if I pass { responseType: "blob" } in the
      // api connector for download action.
      // But still its getting shown in the network. Not able to understand that
      // why is response.data empty then.
      // console.log(response);

      // const blob = new Blob([response.data], { type: "application/pdf" });

      // DOUBT 2 : The pdf getting saved is showing up empty.
      //  But still it has the correct size.
      // saveAs(blob, "analytics_report.pdf");
      solution1(response.data);
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
