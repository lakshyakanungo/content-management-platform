import { prop } from "ramda";
import { useQuery } from "react-query";

import articlesApi from "apis/articles";
// import { DEFAULT_STALE_TIME, QUERY_KEYS } from "src/constants/query";

export const useFetchArticleAnalytics = ({ currentPageNumber }) =>
  useQuery(
    ["articles", currentPageNumber],
    async () => await articlesApi.analytics(currentPageNumber),
    {
      select: prop("data"),
      onError: error => logger.log(error),
    }
  );
