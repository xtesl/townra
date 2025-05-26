import axios from "axios";

const localAddress = "http://localhost:8000"
const publicAddress = "https://fb24dp99-8000.uks1.devtunnels.ms/"

const apiClient = axios.create({
  baseURL: localAddress, // Backend server URL
  withCredentials: true, // Allow sending cookies
});

export default apiClient;
