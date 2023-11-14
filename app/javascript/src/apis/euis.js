import axios from "axios";

// TODO: This file is named as singular. SEe if its correct.
// Better name it with public.

const fetch = () => axios.get("/eui/articles");

const show = slug => axios.get(`/eui/articles/${slug}`);

const search = searchTerm =>
  axios.get(`/eui/articles/search`, {
    params: {
      search_term: searchTerm,
    },
  });

const euiApi = {
  fetch,
  show,
  search,
};

export default euiApi;
