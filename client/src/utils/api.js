import axios from "axios";

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Get token from local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

//Notes
//Interceptors allow modification of requests before they are sent and responses before they are processed.
//Pre-configured Axios instance for making API requests.  It handles setting the base URL and, importantly, adds authentication tokens to the headers of every request.
