import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response interceptor
api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;


    if (
      (error.response?.status === 401 ||
        error?.response?.data?.data === "Token has been expired") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call refresh token endpoint
        const response = await api.post("/auth/refresh", {
          refreshToken,
        });

        const { token } = response.data;

        // Update token in localStorage
        localStorage.setItem("token", token);

        // Update Authorization header
        originalRequest.headers.Authorization = `Bearer ${token}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, clear auth data and redirect to login

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accountId");
        localStorage.removeItem("privateKey");

        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // For other errors, return the error response for handling in components
    return Promise.resolve(error.response);
  }
);

export default api;
