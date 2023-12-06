import axios from "axios";

const fetch = () => axios.get("api/v1/articles");

const search = ({
  searchTerm,
  selectedCategoriesIds,
  activeMenuState,
  currentPageNumber,
}) =>
  axios.get("api/v1/articles/search", {
    params: {
      title: searchTerm,
      category_id: selectedCategoriesIds,
      status: activeMenuState,
      page: currentPageNumber,
    },
  });

const create = ({ payload }) =>
  axios.post("api/v1/articles", {
    article: payload,
  });

const update = ({ id, payload }) =>
  axios.put(`api/v1/articles/${id}`, {
    article: payload,
  });

const show = id => axios.get(`api/v1/articles/${id}`);

const destroy = id => axios.delete(`api/v1/articles/${id}`);

const bulkDelete = ids =>
  axios.delete(`api/v1/articles/bulk_destroy/`, {
    data: { ids },
  });

const bulkUpdate = ({ ids, payload }) =>
  axios.put(`api/v1/articles/bulk_update`, {
    ids,
    article: payload,
  });

const articlesApi = {
  fetch,
  search,
  create,
  show,
  update,
  destroy,
  bulkDelete,
  bulkUpdate,
};

export default articlesApi;
