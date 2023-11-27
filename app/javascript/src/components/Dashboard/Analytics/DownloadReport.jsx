import React, { useEffect, useState } from "react";

import Container from "@bigbinary/neeto-molecules/Container";
import { Toastr } from "@bigbinary/neetoui";

import articlesApi from "apis/articles";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState({});

  responseData;
  // function convertToByteArray(input) {
  //   var sliceSize = 512;
  //   var bytes = [];

  //   for (var offset = 0; offset < input.length; offset += sliceSize) {
  //     var slice = input.slice(offset, offset + sliceSize);

  //     var byteNumbers = new Array(slice.length);

  //     for (var i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }

  //     const byteArray = new Uint8Array(byteNumbers);

  //     bytes.push(byteArray);
  //   }

  //   return bytes;
  // }

  const generatePdf = async () => {
    try {
      await articlesApi.generatePdf();
    } catch (error) {
      logger.error(error);
    }
  };

  const saveAss = ({ blob, fileName }) => {
    // console.log(blob);
    const binaryData = [];
    binaryData.push(blob);
    const objectUrl = window.URL.createObjectURL(
      new Blob(binaryData, { type: "application/pdf" })
    );
    // const objectUrl = window.URL.createObjectURL(
    //   new Blob(convertToByteArray(atob(blob)))
    // );
    // var blobObj = new Blob([atob(blob)], { type: "application/pdf" });

    // const objectUrl = window.URL.createObjectURL(blobObj);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async () => {
    try {
      Toastr.success("Downloading report...");
      const { data } = await articlesApi.download();
      // console.log(data);
      setResponseData(data);
      saveAss({ blob: data, fileName: "analytics_report.pdf" });
      // saveAs(data, "analytics_report.pdf");
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(responseData, "response data");

  useEffect(() => {
    generatePdf();
    setTimeout(() => {
      downloadPdf();
    }, 5000);
  }, []);

  const message = isLoading
    ? "Report is being generated..."
    : "Report downloaded!";

  return (
    <Container>
      <h1>{message}</h1>
    </Container>
  );
};

export default DownloadReport;
