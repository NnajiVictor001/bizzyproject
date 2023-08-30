import axios from 'axios';
import axiosRetry from 'axios-retry';

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosRetry(axiosClient, {
  retries: 0,
  retryCondition: () => true
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token');

  config.headers.Authorization = accessToken && `Bearer ${accessToken}`;
  return config;
});

const ApiService = {
  get: async (url, data, config) => {
    const resp = await axiosClient.get(url, data, config);
    return resp;
  },
  post: async (url, data, config) => {
    const resp = await axiosClient.post(url, data, config);
    return resp;
  },
  put: async (url, data, config) => {
    const resp = await axiosClient.put(url, data, config);
    return resp;
  },
  patch: async (url, data, config) => {
    const resp = await axiosClient.patch(url, data, config);
    return resp;
  },
  delete: async (url, data, config) => {
    const resp = await axiosClient.delete(url, data, config);
    return resp;
  }
};

export default ApiService;
