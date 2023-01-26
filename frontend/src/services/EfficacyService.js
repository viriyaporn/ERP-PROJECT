import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getEfficacyById= async (efficacyId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/efficacy/${efficacyId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllEfficacies = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/efficacy`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deleteEfficacyById = async (efficacyId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/efficacy/${efficacyId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createEfficacy = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/efficacy/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateEfficacyById = async (efficacyId,data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/efficacy/${efficacyId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}