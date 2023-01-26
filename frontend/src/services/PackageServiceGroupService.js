import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getPackageServiceGroupById = async (packageServiceGroupId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service-group/${packageServiceGroupId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllPackageServiceGroups = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service-group`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deletePackageServiceGroupById = async (packageServiceGroupId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service-group/${packageServiceGroupId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createPackageServiceGroup = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service-group/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updatePackageServiceGroupById = async (packageServiceGroupId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-service-group/${packageServiceGroupId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}