import config from "../configs/config"
import { fetchData, fetchJson } from "../utils/Fetch";
import Crypto from 'crypto-js';

export const getFormulaById = async (formulaId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-formula/${formulaId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllFormula = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-formula`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deleteFormulaById = async (formulaId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-formula/${formulaId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createFormula = async (data) => {
  // const formData = JSON.stringify(data); //->new fromData
  const { video, ...body } = data;
  const formData = new FormData(); //ส่งแบบformData
  formData.append('video', video);
  formData.append('data', JSON.stringify(body));
  const fetched = await fetchData(`${config.SERVICE_URL}/back-office/product-formula/`, 'POST', formData);
  const res = await fetched.json();
  if (res?.code !== 200) throw res;
  return res;
}

export const updateFormulaById = async (formulaId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-formula/${formulaId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const checkValue = async (field, value) => {
  const response = await fetchJson(`${config.SERVICE_URL}/back-office/product-formula`, 'POST', JSON.stringify({ field, value }))
  if (response?.code !== 200) throw response;
  return response;
};

