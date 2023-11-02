import axios from "axios";

const fetch = () => axios.get("/eui");

// const update = payload =>
//   axios.put("/site_settings", {
//     site_settings: payload,
//   });

const fetchByCategory = () => axios.get("/eui/grouped_by_category");

const euiApi = {
  fetch,
  fetchByCategory,
  // update,
};

export default euiApi;
