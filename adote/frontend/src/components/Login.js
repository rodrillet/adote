// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', senha: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setCredentials({ 
      ...credentials, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { token, userData } = await loginUser(credentials);
      // Você pode armazenar informações adicionais do usuário conforme necessário
      alert('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Credenciais inválidas. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Campo Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>

        {/* Campo Senha */}
        <div className="mb-6">
          <label htmlFor="senha" className="block text-gray-700">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={credentials.senha}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>

        {/* Mensagem de Erro */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {/* Botão de Submissão */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
