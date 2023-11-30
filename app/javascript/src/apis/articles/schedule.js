import axios from "axios";

const destroy = id =>
  axios.delete(`/articles/delete_scheduled_job/`, {
    params: { id },
  });

const schedulesApi = {
  destroy,
};

export default schedulesApi;
