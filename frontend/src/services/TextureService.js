import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getTextureById = async (textureId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/texture/${textureId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllTextures = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/texture`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deleteTextureById = async (textureId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/texture/${textureId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createTexture = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/texture/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateTextureById = async (textureId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/texture/${textureId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}



