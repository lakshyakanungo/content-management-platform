import axios from "axios";

const authenticate = payload =>
  axios.post("api/v1/session", {
    session: payload,
  });

const authApi = {
  authenticate,
};

export default authApi;
