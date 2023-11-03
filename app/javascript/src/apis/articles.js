import axios from "axios";

const fetch = () => axios.get("/articles");

const fetchByCategory = () => axios.get("/articles/grouped_by_category");

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

const show = id => axios.get(`/articles/${id}`);

const deleteArticle = id => {
  axios.delete(`/articles/${id}`);
};

const deleteMultiple = ids => {
  axios.delete(`/articles/destroy_multiple/`, {
    data: { ids },
  });
};

const updateMultiple = ({ ids, payload }) => {
  axios.put(`articles/update_multiple`, {
    ids,
    article: payload,
  });
};

const articlesApi = {
  fetch,
  fetchByCategory,
  search,
  create,
  show,
  update,
  deleteArticle,
  deleteMultiple,
  updateMultiple,
};

export default articlesApi;
