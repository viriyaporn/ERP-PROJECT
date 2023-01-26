import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getPackageById = async (packageId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package/${packageId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllPackages = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deletePackageById = async (packageId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package/${packageId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createPackage = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updatePackageById = async (packageId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package/${packageId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}