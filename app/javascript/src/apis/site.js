import axios from "axios";

const fetch = () => axios.get("/site");

const update = payload =>
  axios.put("/site", {
    site: payload,
  });

const authenticate = payload =>
  axios.post("/site/authenticate", {
    site: payload,
  });

const siteApi = {
  fetch,
  update,
  authenticate,
};

export default siteApi;
