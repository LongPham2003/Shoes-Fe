import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const register = (data) => {
  return axios.post(`${API_URL}/signup`, data);
};

export const login = (data) => {
  return axios.post(`${API_URL}/access-token`, data);
};

export const refreshToken = () => {
  return axios.get(`${API_URL}/refresh-token`, {}, { withCredentials: true });
};

export const logout = () => {
  return axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};
