import axios from "axios";

const fetch = currentPageNumber =>
  axios.get("api/v1/articles/analytics", {
    params: {
      page: currentPageNumber,
    },
  });

const generatePdf = () => axios.post("api/v1/articles/report", {});

const download = () => axios.get("api/v1/articles/report/download");

const analyticsApi = {
  fetch,
  generatePdf,
  download,
};

export default analyticsApi;
