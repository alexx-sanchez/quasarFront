// --- src/boot/axios.ts ---
import { boot } from 'quasar/wrappers';
import axios, { type AxiosInstance } from 'axios'; // <-- Añadimos 'type' aquí

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ 
  // baseURL: 'http://localhost:3000',
  // baseURL: 'http://10.0.2.2:3000',
  baseURL: 'http://172.23.7.112:3000',
  withCredentials: true 
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };