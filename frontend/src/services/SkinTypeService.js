import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getSkinTypeById= async (skinId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/skin-type/${skinId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllSkinType = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/skin-type`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deleteSkinTypeById = async (skinId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/skin-type/${skinId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createSkinType = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/skin-type/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateSkinTypeById = async (skinId,data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/skin-type/${skinId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}