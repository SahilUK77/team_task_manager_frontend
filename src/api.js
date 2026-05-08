import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/", // Update with your backend API URL
});

// Add a request interceptor to attach the JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;