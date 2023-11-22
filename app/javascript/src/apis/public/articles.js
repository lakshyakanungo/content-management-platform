import axios from "axios";

const fetch = () => axios.get("/public/articles");

const show = slug => axios.get(`/public/articles/${slug}`);

const search = searchTerm =>
  axios.get(`/public/articles/search`, {
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
