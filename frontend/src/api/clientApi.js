import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Shared axios instance for all client-related API calls
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getClients = () => api.get("/clients");
export const getClientById = (id) => api.get(`/clients/${id}`);
export const addClient = (payload) => api.post("/clients", payload);
export const updateClient = (id, payload) => api.put(`/clients/${id}`, payload);
export const deleteClient = (id) => api.delete(`/clients/${id}`);
