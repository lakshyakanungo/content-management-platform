import axios from "axios";

const authenticate = payload =>
  axios.post("/session", {
    session: payload,
  });

const authApi = {
  authenticate,
};

export default authApi;
