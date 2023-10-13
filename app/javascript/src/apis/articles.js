import axios from "axios";

const fetch = () => axios.get("/articles");

const search = ({ searchTerm, selectedCategoriesIds }) =>
  axios.get("/articles/search", {
    params: { title: searchTerm, category_id: selectedCategoriesIds },
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
  search,
  update,
  deleteArticle,
  deleteMultiple,
  updateMultiple,
};

export default articlesApi;
