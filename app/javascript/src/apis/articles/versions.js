import axios from "axios";

const restore = ({ id, versionId }) =>
  axios.put(`api/v1/articles/restore_version/`, {
    id,
    article: { version_id: versionId },
  });

const versionsApi = {
  restore,
};

export default versionsApi;
