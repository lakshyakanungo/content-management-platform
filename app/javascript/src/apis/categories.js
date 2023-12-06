import axios from "axios";

const fetch = () => axios.get("api/v1/categories");

const search = payload =>
  axios.get("api/v1/categories/search", {
    params: payload,
  });

const create = payload =>
  axios.post("api/v1/categories", {
    category: payload,
  });

const update = ({ id, payload }) =>
  axios.put(`api/v1/categories/${id}`, {
    category: payload,
  });

const destroy = ({ id, payload }) =>
  axios.delete(`api/v1/categories/${id}`, {
    data: {
      category: payload,
    },
  });

const categoriesApi = {
  fetch,
  search,
  create,
  update,
  destroy,
};

export default categoriesApi;
