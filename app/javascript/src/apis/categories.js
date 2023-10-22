import axios from "axios";

const fetch = () => axios.get("/categories");

const search = searchTerm =>
  axios.get("/categories/search", {
    params: { name: searchTerm },
  });

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

// TODO: See best way to implement. We need to send id with params or as data
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
  reorder,
};

export default categoriesApi;
