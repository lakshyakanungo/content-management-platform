import axios from "axios";

const destroy = id =>
  axios.delete(`api/v1/articles/delete_scheduled_job/`, {
    params: { id },
  });

const schedulesApi = {
  destroy,
};

export default schedulesApi;
