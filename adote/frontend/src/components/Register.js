// src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para validar os dados do formulário
  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório.';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'Email inválido.';
    }

    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório.';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido. Deve conter de 10 a 15 dígitos.';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória.';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme a senha.';
    } else if (formData.senha !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Atualiza os dados do formulário
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Remove o erro associado ao campo que está sendo modificado
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Chamada de registro de usuário com o campo 'senha'
      await registerUser({
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha,
      });

      alert('Usuário registrado com sucesso!');
      navigate('/login');
    } catch (error) {
      setErrors({ submit: error.error || 'Erro ao registrar usuário.' });
      console.error('Erro ao registrar usuário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Registrar-se</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Campo Nome */}
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded ${
              errors.nome ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.nome ? 'true' : 'false'}
            aria-describedby={errors.nome ? 'nome-error' : null}
          />
          {errors.nome && (
            <p className="text-red-500 text-sm mt-1" id="nome-error">
              {errors.nome}
            </p>
          )}
        </div>

        {/* Campo Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : null}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Campo Telefone */}
        <div className="mb-4">
          <label htmlFor="telefone" className="block text-gray-700">
            Telefone:
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            placeholder="Ex: +5511999999999"
            className={`w-full px-3 py-2 border rounded ${
              errors.telefone ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.telefone ? 'true' : 'false'}
            aria-describedby={errors.telefone ? 'telefone-error' : null}
          />
          {errors.telefone && (
            <p className="text-red-500 text-sm mt-1" id="telefone-error">
              {errors.telefone}
            </p>
          )}
        </div>

        {/* Campo Senha */}
        <div className="mb-4">
          <label htmlFor="senha" className="block text-gray-700">
            Senha:
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded ${
              errors.senha ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.senha ? 'true' : 'false'}
            aria-describedby={errors.senha ? 'senha-error' : null}
          />
          {errors.senha && (
            <p className="text-red-500 text-sm mt-1" id="senha-error">
              {errors.senha}
            </p>
          )}
        </div>

        {/* Campo Confirmar Senha */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirmar Senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby={
              errors.confirmPassword ? 'confirmPassword-error' : null
            }
          />
          {errors.confirmPassword && (
            <p
              className="text-red-500 text-sm mt-1"
              id="confirmPassword-error"
            >
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Mensagem de Erro ao Submeter */}
        {errors.submit && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errors.submit}
          </p>
        )}

        {/* Botão de Submissão */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
