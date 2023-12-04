import { prop } from "ramda";
import { useQuery } from "react-query";

import siteApi from "apis/site";
import { QUERY_KEYS } from "constants/query";

const { SITE } = QUERY_KEYS;

export const useFetchSite = () =>
  useQuery([SITE], siteApi.fetch, {
    select: prop("data"),
  });
