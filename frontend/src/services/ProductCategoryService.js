import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getProductCategoryById = async (productCategoryId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-category/${productCategoryId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllProductCategories = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-category`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deleteProductCategoryById = async (productCategoryId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-category/${productCategoryId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createProductCategory = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-category/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateProductCategoryById = async (productCategoryId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-category/${productCategoryId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}



