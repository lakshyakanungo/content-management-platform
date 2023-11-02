import axios from "axios";

const fetch = () => axios.get("/articles");

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
  search,
  create,
  update,
  deleteArticle,
  deleteMultiple,
  updateMultiple,
};

export default articlesApi;
