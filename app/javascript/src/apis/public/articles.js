import axios from "axios";

const fetch = () => axios.get("api/v1/public/articles");

const show = slug => axios.get(`api/v1/public/articles/${slug}`);

const search = searchTerm =>
  axios.get(`api/v1/public/articles/search`, {
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
