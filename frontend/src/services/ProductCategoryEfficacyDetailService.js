import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";


export const deleteProductCategoryEfficacyDetailById = async (efficacyId) => {
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/category-efficacy-detail/${efficacyId}`, 'DELETE');
  if (res?.code !== 200) throw res;
  return res;
}

export const createProductCategoryEfficacyDetail = async (data) => {
  const formData = JSON.stringify(data);
  const res = await fetchJson(`${config.SERVICE_URL}/back-office/category-efficacy-detail/`, 'POST', formData);
  if (res?.code !== 200) throw res;
  return res;
}




