import axios from "axios";

const fetch = () => axios.get("/categories");

const create = payload =>
  axios.post("/categories", {
    category: payload,
  });

const update = ({ id, payload }) =>
  axios.put(`/categories/${id}`, {
    category: payload,
  });

const reorder = ({ id, payload }) =>
  axios.put(`/categories/${id}`, {
    category: payload,
  });

const destroy = id => axios.delete(`/categories/${id}`);

const categoriesApi = {
  fetch,
  create,
  update,
  destroy,
  reorder,
};

export default categoriesApi;
