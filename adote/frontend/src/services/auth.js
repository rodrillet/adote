// src/services/auth.js

import api from './api';

export const registerUser = async (nome, email, telefone, password) => {
  const response = await api.post('/auth/register', { nome, email, telefone, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const adminLogin = async (username, password) => {
  const response = await api.post('/auth/admin/login', { username, password });
  return response.data;
};
