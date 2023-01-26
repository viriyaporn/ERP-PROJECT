import config from "../configs/config";
import { fetchJson } from "../utils/Fetch";

export const getAllBrandStandards = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-standard/`)
  if (res?.code !== 200) throw res;
  return res;
};

export const getBrandStandardById = async (standardId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-standard/${standardId}`);
  if (res?.code !== 200) throw res;
  return res;
}
export const deleteBrandStandardById = async (standardId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-standard/${standardId}`, 'DELETE')
  if (res?.code !== 200) throw res;
  return res;
}

export const createBrandStandard = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-standard`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateBrandStandardById = async (standardId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-standard/${standardId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}


