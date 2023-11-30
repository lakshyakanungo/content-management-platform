import axios from "axios";

const fetch = currentPageNumber =>
  axios.get("/articles/analytics", {
    params: {
      page: currentPageNumber,
    },
  });

const generatePdf = () => axios.post("/articles/report", {});

const download = () => axios.get("/articles/report/download");

const analyticsApi = {
  fetch,
  generatePdf,
  download,
};

export default analyticsApi;
