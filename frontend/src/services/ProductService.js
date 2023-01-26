import config from "../configs/config";
import { fetchJson } from "../utils/Fetch";

export const getAllProduct = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product/`)
  if (res?.code !== 200) throw res;
  return res;
};

export const getProductById = async (productId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product/${productId}`);
  if (res?.code !== 200) throw res;
  return res;
}
export const deleteProduct = async (productId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product/${productId}`, 'DELETE')
  if (res?.code !== 200) throw res;
  return res;
}

export const createProduct = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateProductById = async (productId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product/${productId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}


