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

const restore = ({ id, versionId }) => {
  axios.put(`/articles/restore_version/`, {
    id,
    article: { version_id: versionId },
  });
};

const show = id => axios.get(`/articles/${id}`);

const destroy = id => {
  axios.delete(`/articles/${id}`);
};

const bulkDelete = ids => {
  axios.delete(`/articles/bulk_destroy/`, {
    data: { ids },
  });
};

const bulkUpdate = ({ ids, payload }) => {
  axios.put(`articles/bulk_update`, {
    ids,
    article: payload,
  });
};

const articlesApi = {
  fetch,
  search,
  create,
  show,
  update,
  restore,
  destroy,
  bulkDelete,
  bulkUpdate,
};

export default articlesApi;
