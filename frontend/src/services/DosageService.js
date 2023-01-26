import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getDosageById = async (dosageId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/dosage/${dosageId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllDosage = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/dosage`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deleteDosageById = async (dosageId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/dosage/${dosageId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createDosage = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/dosage/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateDosageById = async (dosageId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/dosage/${dosageId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}



