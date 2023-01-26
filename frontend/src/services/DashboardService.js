import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getDashboardSummary = async () => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/dashboard`)
  if (res?.code !== 200) throw res;
  return res;
}

