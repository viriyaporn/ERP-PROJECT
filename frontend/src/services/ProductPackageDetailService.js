import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const getProductPackageDetailById= async (productPackageDetailId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-detail/${productPackageDetailId}`);
  if (res?.code !== 200) throw res;
  return res;
}

export const getAllProductPackageDetails = async (filters = null) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-detail`)
  if (res?.code !== 200) throw res;
  return res;
}

export const deleteProductPackageDetailById = async (productPackageDetailId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-detail/${productPackageDetailId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createProductPackageDetail = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-detail/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}

export const updateProductPackageDetailById = async (productPackageDetailId,data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/product-detail/${productPackageDetailId}`, 'PUT', formData);
  if (res?.code !== 200) throw res;
  return res;
}