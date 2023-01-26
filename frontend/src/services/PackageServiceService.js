import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getPackageServiceById = async (packageServiceId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service/${packageServiceId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllPackageServices = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deletePackageServiceById = async (packageServiceId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service/${packageServiceId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createPackageService = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updatePackageServiceById = async (packageServiceId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service/${packageServiceId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}