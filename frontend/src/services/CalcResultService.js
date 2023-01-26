import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";
import Crypto from 'crypto-js';

export const getCalcResultById = async (calcResultId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/calc-result/${calcResultId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllCalcResult = async (filters = null) => {
  const encKey = import.meta.env.VITE_ENCRYPT_KEY;
  const query = new URLSearchParams(filters ? {
    filters: Crypto.AES.encrypt(JSON.stringify(filters ?? ''), encKey),
  } : {})
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/calc-result/?${query}`)
  if (res?.code !== 200) throw res;
  return res;
}

export const createBrandCalcResult = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/calc-result/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}
