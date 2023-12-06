import axios from "axios";

const fetch = () => axios.get("api/v1/redirections");

const create = payload =>
  axios.post("api/v1/redirections", {
    redirection: payload,
  });

const update = ({ id, payload }) =>
  axios.put(`api/v1/redirections/${id}`, {
    redirection: payload,
  });

const destroy = id => axios.delete(`api/v1/redirections/${id}`);

const redirectionsApi = {
  fetch,
  create,
  update,
  destroy,
};

export default redirectionsApi;
