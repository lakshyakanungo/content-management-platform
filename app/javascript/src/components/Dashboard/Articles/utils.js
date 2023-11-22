import queryString from "query-string";

export const updateQueryParameters = ({
  activeMenuState,
  currentPageNumber,
}) => {
  const query = queryString.stringify({
    status: activeMenuState,
    page: currentPageNumber,
  });
  const newUrl = `/articles?${query}`;
  window.history.replaceState(null, "", newUrl);
};
