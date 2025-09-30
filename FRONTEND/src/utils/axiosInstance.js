import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Backend URL
  timeout: 10000,                    // 10 seconds
  withCredentials: true,             // Needed for cookies/auth
});

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code in the 2xx range triggers this
    return response;
  },
  (error) => {
    // If the server responded with a status code outside 2xx
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          console.error("Bad Request:", data);
          break;
        case 401:
          console.error("Unauthorized:", data);
          break;
        case 403:
          console.error("Forbidden:", data);
          break;
        case 404:
          console.error("Not Found:", data);
          break;
        case 500:
          console.error("Internal Server Error:", data);
          break;
        default:
          console.error(`Error (${status}):`, data);
      }
    } 
    // If request was made but no response received
    else if (error.request) {
      console.error("Network Error: No response received", error.request);
    } 
    // Something happened in setting up the request
    else {
      console.error("Error:", error.message);
    }

    // Reject promise with standardized error object
    return Promise.reject({
      message: error.response?.data?.message || error.message || "Unknown error occurred",
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default axiosInstance;
