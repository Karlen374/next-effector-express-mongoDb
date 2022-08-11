import { changeApiErrorStatus } from 'src/models/apiErrorAlert/apiErrorAlert';

export const request = async (url, method = 'GET', body = null, headers = null) => {
  try {
    if (!headers) headers = { 'Content-Type': 'application/json' };
    const response = await fetch(url, { method, body, headers });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url} status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    changeApiErrorStatus(true);
    setTimeout(() => {
      changeApiErrorStatus(false);
    }, 2000);
    throw e;
  }
};
