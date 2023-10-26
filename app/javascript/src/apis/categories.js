import axios from "axios";

const fetch = () => axios.get("/categories");

const search = payload =>
  axios.get("/categories/search", {
    params: payload,
  });

const create = payload =>
  axios.post("/categories", {
    category: payload,
  });

const update = ({ id, payload }) =>
  axios.put(`/categories/${id}`, {
    category: payload,
  });

const destroy = ({ id, payload }) =>
  axios.delete(`/categories/${id}`, {
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
