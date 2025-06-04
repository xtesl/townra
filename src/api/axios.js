import axios from "axios";

const localAddress = "http://localhost:8000";
const publicAddress = "https://fb24dp99-8000.uks1.devtunnels.ms/";

const apiClient = axios.create({
  baseURL: localAddress, // Use publicAddress if deploying
  withCredentials: true, // Send cookies with each request
});

// Axios response interceptor
apiClient.interceptors.response.use(
  response => response, // If response is OK, return it as-is
  async error => {
    const originalRequest = error.config;

    // Only try refresh once per failed request
    if (
      error.response?.status === 401 &&
      error.response?.headers["www-authenticate"]?.includes("Bearer") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Try refreshing token
        await axios.post(
          `${localAddress}/auth/verify-token`,
          {},
          { withCredentials: true }
        );

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Optional: Redirect to login page or log out
        console.warn("Refresh token expired or invalid");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
