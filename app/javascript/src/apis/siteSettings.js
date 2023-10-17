import axios from "axios";

const show = () => axios.get("/site_settings");

const update = payload =>
  axios.put("/site_settings", {
    site_settings: payload,
  });

const siteSettingsApi = {
  show,
  update,
};

export default siteSettingsApi;
