import axios from "axios";

const API_URL = "https://backend-part-1.onrender.com/api";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/admin/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/admin/login`, credentials);
  return response.data;
};

export const fetchCustomers = (token) => {
  return axios.get(`${API_URL}/customers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addCustomer = (customer, token) => {
  return axios.post(`${API_URL}/customers/create`, customer, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCustomer = (id, customer, token) => {
  return axios.put(`${API_URL}/customers/${id}`, customer, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteCustomer = (id, token) => {
  return axios.delete(`${API_URL}/customers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
