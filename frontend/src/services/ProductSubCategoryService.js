import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getAllProductSubCategories = async (filters = null) => {
    const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-subcategory`)
    if (res?.code !== 200) throw res;
    return res;
  }

export const getProductSubCategoryById = async (productSubCategoryId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-subcategory/${productSubCategoryId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const deleteProductSubCategoryById = async (productSubCategoryId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-subcategory/${productSubCategoryId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createProductSubCategory = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-subcategory/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateProductSubCategoryById = async (productSubCategoryId, data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-subcategory/${productSubCategoryId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}



