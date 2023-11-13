import axios from "axios";

// TODO: This file is named as singular. SEe if its correct.
// Better name it with public.

const fetch = () => axios.get("/euis");

const show = slug => axios.get(`/euis/${slug}`);

const search = searchTerm =>
  axios.get(`euis/search`, {
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
