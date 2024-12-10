// src/services/api.js

import axios from 'axios';

/**
 * Função para obter a URL base a partir das variáveis de ambiente.
 * Permite configurar diferentes URLs para desenvolvimento e produção.
 */
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL_DEV || 'http://localhost:5000';
  }
  return process.env.REACT_APP_API_URL_PROD || 'https://seu-backend-prod.com';
};

// Criação da instância do Axios com base URL configurável e timeout
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000, // Tempo limite de 10 segundos para requisições
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Considere alternativas mais seguras para armazenar tokens
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar respostas de erro globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Redirecionar para login se o token for inválido ou expirado
      if (status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      // Tratar outros códigos de status conforme necessário
      if (status === 403) {
        console.error('Acesso negado.');
      }

      // Exibir mensagens de erro específicas
      if (data && data.message) {
        console.error(`Erro: ${data.message}`);
      }
    } else if (error.request) {
      // Erro na requisição, mas nenhuma resposta foi recebida
      console.error('Nenhuma resposta recebida do servidor.');
    } else {
      // Erro ao configurar a requisição
      console.error('Erro na configuração da requisição:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Função para definir o token manualmente (útil para login).
 *
 * @param {string} token - Token de autenticação JWT.
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
  }
};

/**
 * Função para limpar o token (útil para logout).
 */
export const clearAuthToken = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.Authorization;
};

export default api;
