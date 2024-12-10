// src/components/PetEditForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

const PetEditForm = ({ petId, onClose }) => {
  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    raca: '',
    descricao: '',
    adotado: false,
    imagem: null,
  });

  // Estado para mensagens de erro
  const [error, setError] = useState('');

  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(false);

  // Estado para controlar o carregamento de atualização
  const [isUpdating, setIsUpdating] = useState(false);

  // Estado para armazenar a imagem atual
  const [currentImage, setCurrentImage] = useState('');

  // Fetch dos dados do pet quando o componente monta
  useEffect(() => {
    const fetchPetData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/pets/${petId}`);
        setFormData({
          nome: response.data.nome || '',
          idade: response.data.idade || '',
          raca: response.data.raca || '',
          descricao: response.data.descricao || '',
          adotado: response.data.adotado || false,
          imagem: null, // Reseta a imagem para evitar conflitos
        });
        setCurrentImage(response.data.imagem || '');
      } catch (error) {
        setError('Erro ao carregar os dados do pet.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetData();
  }, [petId]);

  // Função para lidar com as mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Limpa o erro quando o usuário começa a digitar
    if (error) {
      setError('');
    }
  };

  // Função para validar o formulário antes do envio
  const validateForm = () => {
    const { nome, idade, raca, descricao } = formData;
    if (!nome || !idade || !raca || !descricao) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    if (isNaN(idade) || idade <= 0) {
      setError('A idade deve ser um número válido maior que zero.');
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

    setIsUpdating(true);

    const data = new FormData();
    data.append('nome', formData.nome);
    data.append('idade', formData.idade);
    data.append('raca', formData.raca);
    data.append('descricao', formData.descricao);
    data.append('adotado', formData.adotado);
    if (formData.imagem instanceof File) {
      data.append('imagem', formData.imagem);
    }

    try {
      const response = await api.put(`/pets/${petId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Pet atualizado com sucesso!');
      onClose();
    } catch (error) {
      setError('Erro ao atualizar os dados do pet.');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Função para fechar o modal ao clicar fora da área do formulário
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Função para fechar o modal com a tecla Esc
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Adiciona e remove o listener de tecla Esc
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-pet-title"
    >
      <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
        <h2 id="edit-pet-title" className="text-2xl font-bold mb-4">
          Editar Pet
        </h2>

        {/* Botão para fechar o modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Fechar modal"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Preloader de Carregamento */}
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Campo de Nome */}
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
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                placeholder="Digite o nome do pet"
              />
            </div>

            {/* Campo de Idade */}
            <div className="mb-4">
              <label htmlFor="idade" className="block text-gray-700">
                Idade:
              </label>
              <input
                type="number"
                id="idade"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                placeholder="Digite a idade do pet"
                min="0"
              />
            </div>

            {/* Campo de Raça */}
            <div className="mb-4">
              <label htmlFor="raca" className="block text-gray-700">
                Raça:
              </label>
              <input
                type="text"
                id="raca"
                name="raca"
                value={formData.raca}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                placeholder="Digite a raça do pet"
              />
            </div>

            {/* Campo de Descrição */}
            <div className="mb-4">
              <label htmlFor="descricao" className="block text-gray-700">
                Descrição:
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                placeholder="Digite uma descrição para o pet"
                rows="4"
              ></textarea>
            </div>

            {/* Campo de Adotado */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="adotado"
                name="adotado"
                checked={formData.adotado}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="adotado" className="text-gray-700">
                Adotado
              </label>
            </div>

            {/* Campo de Imagem */}
            <div className="mb-6">
              <label htmlFor="imagem" className="block text-gray-700">
                Imagem:
              </label>
              {/* Preview da Imagem Atual */}
              {currentImage && (
                <div className="mb-2">
                  <img
                    src={`http://localhost:5000/uploads/${currentImage}`}
                    alt="Imagem atual do pet"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
              {/* Preview da Nova Imagem */}
              {formData.imagem && (
                <div className="mb-2">
                  <img
                    src={URL.createObjectURL(formData.imagem)}
                    alt="Nova imagem do pet"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
              <input
                type="file"
                id="imagem"
                name="imagem"
                onChange={handleChange}
                accept="image/*"
                className="w-full"
              />
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring ${
                  isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Definição de PropTypes para validação das props
PetEditForm.propTypes = {
  petId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PetEditForm;
