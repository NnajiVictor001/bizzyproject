import axios from 'axios';

export const apiCall = async (method, url, accessToken = null, data = null, params = null) => {
  const config = {
    method,
    url: `${process.env.REACT_APP_API_URL}${url}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  if (data) config.data = data;
  if (params) config.params = params;
  return await axios(config);
};

export const baseMediaEndpoint = process.env.REACT_APP_API_URL.includes('localhost')
  ? `${process.env.REACT_APP_API_URL}`.replace('/api', '')
  : '';
