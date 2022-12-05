import axios, { AxiosInstance } from 'axios';

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_HOST,
      timeout: 10000,
    });
    this.instance.interceptors.response.use((config) => {
      return config.data;
    });
  }
}

export const http = new Http().instance;
