import config from "../configs/config";
import { fetchJson } from "../utils/Fetch";

export const getAllBrandServices = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-service/`)
  if (res?.code !== 200) throw res;
  return res;
};

export const getBrandServiceById = async (brandId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-service/${brandId}`);
  if (res?.code !== 200) throw res;
  return res;
}
export const deleteBrandServiceById = async (brandId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-service/${brandId}`, 'DELETE')
  if (res?.code !== 200) throw res;
  return res;
}

export const createBrandService = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-service`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateBrandServiceById = async (brandId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/brand-service/${brandId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}


