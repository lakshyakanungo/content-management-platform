import axios from "axios";

const fetch = () => axios.get("/open_graph");

const update = payload =>
  axios.put("/open_graph", {
    open_graph: payload,
  });

const openGraphsApi = {
  fetch,
  update,
};

export default openGraphsApi;
