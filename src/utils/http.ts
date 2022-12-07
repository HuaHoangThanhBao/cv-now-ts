import axios, { AxiosInstance } from 'axios';
import { baseURL } from '../contants';

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 10000,
    });
    this.instance.interceptors.response.use((config) => {
      return config.data;
    });
  }
}

export const http = new Http().instance;
