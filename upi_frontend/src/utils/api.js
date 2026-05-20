import axios from "axios";

// Base URL
const BASE_URL = "http://localhost:5000/api";

// Axios Instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET
export const getAPI = async (endpoint) => {
  const response = await api.get(endpoint);
  return response.data;
};

// POST
export const postAPI = async (endpoint, data) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

// PUT
export const putAPI = async (endpoint, data) => {
  const response = await api.put(endpoint, data);
  return response.data;
};

// DELETE
export const deleteAPI = async (endpoint) => {
  const response = await api.delete(endpoint);
  return response.data;
};