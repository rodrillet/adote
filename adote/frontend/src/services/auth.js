// src/services/auth.js

import api, { setAuthToken, clearAuthToken } from './api';

/**
 * Registra um novo usuário.
 *
 * @param {Object} userData - Dados do usuário a ser registrado.
 * @param {string} userData.nome - Nome do usuário.
 * @param {string} userData.email - Email do usuário.
 * @param {string} userData.telefone - Telefone do usuário.
 * @param {string} userData.senha - Senha do usuário.
 * @returns {Promise<Object>} Dados do usuário registrado.
 * @throws {Error} Se ocorrer um erro durante o registro.
 */
export const registerUser = async ({ nome, email, telefone, senha }) => {
  try {
    const response = await api.post('/auth/register', { nome, email, telefone, senha });
    return response.data;
  } catch (error) {
    // Repassa o erro para ser tratado no componente que chama a função
    throw error.response?.data || { message: 'Erro desconhecido durante o registro.' };
  }
};

/**
 * Realiza o login de um usuário.
 *
 * @param {Object} credentials - Credenciais do usuário.
 * @param {string} credentials.email - Email do usuário.
 * @param {string} credentials.senha - Senha do usuário.
 * @returns {Promise<Object>} Dados do usuário e token de autenticação.
 * @throws {Error} Se ocorrer um erro durante o login.
 */
export const loginUser = async ({ email, senha }) => {
  try {
    const response = await api.post('/auth/login', { email, senha });
    const { token, ...userData } = response.data;

    if (token) {
      setAuthToken(token); // Configura o token para requisições futuras
    }

    return { token, userData };
  } catch (error) {
    // Repassa o erro para ser tratado no componente que chama a função
    throw error.response?.data || { message: 'Erro desconhecido durante o login.' };
  }
};

/**
 * Realiza o login de um administrador.
 *
 * @param {Object} credentials - Credenciais do administrador.
 * @param {string} credentials.username - Nome de usuário do administrador.
 * @param {string} credentials.senha - Senha do administrador.
 * @returns {Promise<Object>} Dados do administrador e token de autenticação.
 * @throws {Error} Se ocorrer um erro durante o login do administrador.
 */
export const adminLogin = async ({ username, senha }) => {
  try {
    const response = await api.post('/auth/admin/login', { username, senha });
    const { token, ...adminData } = response.data;

    if (token) {
      setAuthToken(token); // Configura o token para requisições futuras
    }

    return { token, adminData };
  } catch (error) {
    // Repassa o erro para ser tratado no componente que chama a função
    throw error.response?.data || { message: 'Erro desconhecido durante o login de administrador.' };
  }
};

/**
 * Realiza o logout do usuário ou administrador.
 *
 * @returns {void}
 */
export const logout = () => {
  clearAuthToken();
};
