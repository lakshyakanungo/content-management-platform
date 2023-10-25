import axios from "axios";

const fetch = () => axios.get("/articles");

const fetchByCategory = () => axios.get("/articles/grouped");

const search = ({ searchTerm, selectedCategoriesIds, activeMenuState }) =>
  axios.get("/articles/search", {
    params: {
      title: searchTerm,
      category_id: selectedCategoriesIds,
      status: activeMenuState,
    },
  });

const create = ({ payload }) =>
  axios.post("/articles", {
    article: payload,
  });

const update = ({ id, payload }) => {
  axios.put(`/articles/${id}`, {
    article: payload,
  });
};

const deleteArticle = id => {
  axios.delete(`/articles/${id}`);
};

const deleteMultiple = ids => {
  axios.post(`/articles/destroy_multiple/`, {
    ids,
  });
};

const updateMultiple = ({ ids, payload }) => {
  axios.post(`articles/update_multiple`, {
    ids,
    article: payload,
  });
};

const articlesApi = {
  fetch,
  fetchByCategory,
  search,
  create,
  update,
  deleteArticle,
  deleteMultiple,
  updateMultiple,
};

export default articlesApi;
