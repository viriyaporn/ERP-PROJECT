import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";
import Crypto from 'crypto-js';

export const getAllUsers = async (filters = null) => {
  const encKey = import.meta.env.VITE_ENCRYPT_KEY;
  const query = new URLSearchParams(filters ? {
    filters: Crypto.AES.encrypt(JSON.stringify(filters ?? ''), encKey),
  } : {})
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/user/?${query}`)
  if (res?.code !== 200) throw res;
  return res;
};

export const deleteUserById = async (userId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/user/${userId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createUser = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/user`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateProfile = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/user/profile`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updatePassword = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/user/update-password`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateUserById = async (userId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/user/${userId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const getUserById = async (userId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/user/${userId}`);
  if (res?.code !== 200) throw res;
  return res;
}