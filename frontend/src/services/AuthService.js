import config from "../configs/config"
import { fetchJson } from "../utils/Fetch";

export const login = async ({ username, password, from }) => {
  const response = await fetchJson(
    `${config.SERVICE_URL}/auth/login`,
    'POST',
    JSON.stringify({ username, password, from })
  )
  if (response?.code !== 200) throw response;
  return response;
};

export const checkDuplicateFieldValue = async (field, value) => {
  const response = await fetchJson(`${config.SERVICE_URL}/auth/check-duplicate`, 'POST', JSON.stringify({ field, value }))
  if (response?.code !== 200) throw response;
  return response;
};

export const sendResetPassLink = async ({ email }) => {
  const response = await fetchJson(
    `${config.SERVICE_URL}/auth/forgot-password`,
    'POST',
    JSON.stringify({ email, from: 'backOffice' })
  )
  if (response?.code !== 200) throw response;
  return response;
};

export const verifyResetPassToken = async (token) => {
  const response = await fetchJson(
    `${config.SERVICE_URL}/auth/verify-reset-token`,
    'POST',
    JSON.stringify({ token })
  )
  if (response?.code !== 200) throw response;
  return response;
};

export const resetPassword = async ({password, token}) => {
  const response = await fetchJson(
    `${config.SERVICE_URL}/auth/reset-password`,
    'POST',
    JSON.stringify({ password, token })
  )
  if (response?.code !== 200) throw response;
  return response;
};