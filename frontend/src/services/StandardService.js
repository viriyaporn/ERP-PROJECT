import config from "../configs/config";
import { fetchJson } from "../utils/Fetch";

export const getAllStandardServices = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/standard-service/`)
  if (res?.code !== 200) throw res;
  return res;
};

export const getStandardServiceById = async (standardServiceId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/standard-service/${standardServiceId}`);
  if (res?.code !== 200) throw res;
  return res;
}
export const deleteStandardById = async (standardServiceId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/standard-service/${standardServiceId}`, 'DELETE')
  if (res?.code !== 200) throw res;
  return res;
}

export const createStandardService = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/standard-service`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateStandardServiceById = async (standardServiceId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/standard-service/${standardServiceId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}


