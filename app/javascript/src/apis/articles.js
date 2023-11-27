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

const update = ({ id, payload }) =>
  axios.put(`/articles/${id}`, {
    article: payload,
  });

const restore = ({ id, versionId }) =>
  axios.put(`/articles/restore_version/`, {
    id,
    article: { version_id: versionId },
  });

const show = id => axios.get(`/articles/${id}`);

const destroy = id => axios.delete(`/articles/${id}`);

const deleteScheduledJob = id =>
  axios.delete(`/articles/delete_scheduled_job/`, {
    params: { id },
  });

const bulkDelete = ids =>
  axios.delete(`/articles/bulk_destroy/`, {
    data: { ids },
  });

const bulkUpdate = ({ ids, payload }) =>
  axios.put(`articles/bulk_update`, {
    ids,
    article: payload,
  });

const generatePdf = () => axios.post("/articles/report", {});

const download = () =>
  // axios.get("/articles/report/download", {
  //   responseType: "buffer",
  // });
  axios.get("/articles/report/download");
// axios.get("/articles/report/download", {
//   responseType: "blob",
// });

const articlesApi = {
  fetch,
  search,
  analytics,
  create,
  show,
  update,
  restore,
  destroy,
  deleteScheduledJob,
  bulkDelete,
  bulkUpdate,
  generatePdf,
  download,
};

export default articlesApi;
