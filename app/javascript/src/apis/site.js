import axios from "axios";

const fetch = () => axios.get("api/v1/site");

const update = payload =>
  axios.put("api/v1/site", {
    site: payload,
  });

const authenticate = payload =>
  axios.post("api/v1/site/authenticate", {
    site: payload,
  });

const siteApi = {
  fetch,
  update,
  authenticate,
};

export default siteApi;
