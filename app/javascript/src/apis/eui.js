import axios from "axios";

const fetch = () => axios.get("/euis");

const show = slug => axios.get(`/euis/${slug}`);

const euiApi = {
  fetch,
  show,
};

export default euiApi;
