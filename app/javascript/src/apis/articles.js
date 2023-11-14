import axios from "axios";

const fetch = () => axios.get("/articles");

const search = ({
  searchTerm,
  selectedCategoriesIds,
  activeMenuState,
  currentPageNumber,
}) =>
  axios.get("/articles/search", {
    params: {
      title: searchTerm,
      category_id: selectedCategoriesIds,
      status: activeMenuState,
      page: currentPageNumber,
    },
  });

//TODO: See if this way of passing key value pair for params in api connector okay?
// Or this logic should be moved to the place of calling the api.
const analytics = (currentPageNumber, orderBy) =>
  axios.get("/articles/analytics", {
    params: {
      page: currentPageNumber,
      order_by: orderBy,
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
  analytics,
  create,
  show,
  update,
  restore,
  destroy,
  bulkDelete,
  bulkUpdate,
};

export default articlesApi;
