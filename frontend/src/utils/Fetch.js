import config from "../configs/config";

export const fetchData = async (url, method = 'GET', body = null, { headers = {}, credentials = 'same-origin' } = {}) => {
  const auth = await new Promise(resolve => resolve(JSON.parse(localStorage.getItem('auth')))).catch(e => false);
  if (auth?.accessToken) {
    headers['Authorization'] = auth.accessToken ? `Bearer ${auth.accessToken}` : '';
    headers['X-REFRESH-TOKEN'] = auth.refreshToken;
  }
  headers['X-Requested-With'] = 'XMLHttpRequest';
  const fetched = await fetch(url, { method, body, headers, credentials });

  if (!fetched.ok) {
    // if (fetched.status === 404) throw {text: 'ไม่พบข้อมูลที่ระบุ\n โปรดลองอีกครั้ง หรือติดต่อเจ้าหน้าที่เพื่อขอความช่วยเหลือ'};
    throw await fetched.json().catch(e => ({
      code: fetched.status,
      message: fetched.statusText,
      error: e,
    }));
  }
  return fetched;
}

export const fetchJson = async (url, method = 'GET', body = null) => {
  const fetched = await fetchData(url, method, body, {
    headers: { 'Content-Type': 'application/json' }
  });
  const result = await fetched.json();
  if (!result) throw result;
  if (result.success === false) throw result;
  return result;
}

export const fetchText = async (url, method = 'GET', body = null) => {
  const fetched = await fetchData(url, method, body);
  const result = await fetched.text();
  if (!result) throw result;
  return result;
}

export const load = async (url, target) => {
  const fetched = await fetch(url);
  const body = await fetched.text();
  const html = document.createElement('html');
  html.innerHTML = body;
  return html.querySelector(target);
}

export const getToken = async () => {
  const auth = await new Promise(resolve => resolve(JSON.parse(localStorage.getItem('auth')))).catch(e => false);
  if (!auth || new Date() > new Date(+`${auth.exp}`.padEnd(13, 0))) {
    console.log('!auth');
    return fetch(`${config.SERVICE_URL}/get-token`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': auth?.token ? `Bearer ${auth.token}` : '',
        'X-REFRESH-TOKEN': auth?.refresh_token || '',
      }),
    }).then(res => {
      if (!res.ok) {
        console.error('get token error', res);
        throw new Error(`get token error: ${res.statusText}`);
      }
      return res.json();
    }).then(({ iat, user_id, username, ...auth }) => {
      localStorage.setItem('auth', JSON.stringify(auth));
      return auth;
    }).catch(e => {
      console.error('getToken ERROR:', e);
    });
  }

  // console.log('auth', auth)
  return auth;
};
