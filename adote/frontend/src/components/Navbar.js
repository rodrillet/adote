// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth';

const Login = () => {
  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Estado para mensagens de erro
  const [error, setError] = useState('');

  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Desestruturação para facilitar o acesso aos campos
  const { email, password } = formData;

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Limpa o erro quando o usuário começa a digitar
    if (error) {
      setError('');
    }
  };

  // Função para validar o formulário antes do envio
  const validateForm = () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return false;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um email válido.');
      return false;
    }

    return true;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida o formulário
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginUser(email, password);

      // Armazena o token no localStorage (considere usar httpOnly cookies para maior segurança)
      localStorage.setItem('token', data.token);

      // Redireciona para a página inicial ou dashboard
      navigate('/'); // Altere conforme a rota desejada

      // Opcional: exibir uma mensagem de sucesso
      // alert('Login realizado com sucesso!');
    } catch (error) {
      // Tratamento de erros baseado na resposta do servidor
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Ocorreu um erro. Por favor, tente novamente.');
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      {/* Mensagem de Erro */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Campo de Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              error && !email
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            placeholder="Digite seu email"
          />
        </div>

        {/* Campo de Senha */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
              error && !password
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            placeholder="Digite sua senha"
          />
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {/* Link para Registro */}
      <p className="mt-4 text-center text-gray-600">
        Não tem uma conta?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Registre-se
        </Link>
      </p>
    </div>
  );
};

export default Login;
