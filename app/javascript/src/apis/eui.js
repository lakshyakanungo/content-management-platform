import axios from "axios";

const fetch = () => axios.get("/eui");

// const update = payload =>
//   axios.put("/site_settings", {
//     site_settings: payload,
//   });

const fetchByCategory = () => axios.get("/eui/grouped_by_category");

const fetchArticle = slug =>
  axios.get(`/eui/show_article`, {
    params: {
      slug,
    },
  });

const euiApi = {
  fetch,
  fetchByCategory,
  fetchArticle,
  // update,
};

export default euiApi;
