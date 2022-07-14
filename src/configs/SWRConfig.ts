import { api } from "../lib/api";

export const SWRConfig = {
  refreshInterval: 3000,
  fetcher: (url) => api.get(url).then((res) => res.data),
};
