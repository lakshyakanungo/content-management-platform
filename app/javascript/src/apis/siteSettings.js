import axios from "axios";

const fetch = () => axios.get("/site_settings");

const update = payload =>
  axios.put("/site_settings", {
    site_settings: payload,
  });

const authenticate = payload =>
  axios.post("/site_settings/authenticate", {
    site_settings: payload,
  });

const siteSettingsApi = {
  fetch,
  update,
  authenticate,
};

export default siteSettingsApi;
