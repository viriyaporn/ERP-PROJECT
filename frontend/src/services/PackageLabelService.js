import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getPackageLabelById = async (packageLabelId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-label/${packageLabelId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllPackageLabels = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-label`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deletePackageLabelById = async (packageLabelId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-label/${packageLabelId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createPackageLabel = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-label/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updatePackageLabelById = async (packageLabelId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/package-label/${packageLabelId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}



