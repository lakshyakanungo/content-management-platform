import axios from "axios";

const fetch = () => axios.get("/eui/articles");

const show = slug => axios.get(`/eui/articles/${slug}`);

const search = searchTerm =>
  axios.get(`/eui/articles/search`, {
    params: {
      search_term: searchTerm,
    },
  });

const articlesApi = {
  fetch,
  show,
  search,
};

export default articlesApi;
