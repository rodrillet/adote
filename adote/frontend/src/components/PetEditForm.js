// src/components/PetEditForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PetEditForm = ({ petId, onClose }) => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    raca: '',
    descricao: '',
    adotado: false,
    imagem: null,
  });

  useEffect(() => {
    api.get(`/pets/${petId}`)
      .then(response => setFormData({
        ...response.data,
        imagem: null, // Reseta a imagem para evitar conflitos
      }))
      .catch(error => console.error(error));
  }, [petId]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nome', formData.nome);
    data.append('idade', formData.idade);
    data.append('raca', formData.raca);
    data.append('descricao', formData.descricao);
    data.append('adotado', formData.adotado);
    if (formData.imagem instanceof File) {
      data.append('imagem', formData.imagem);
    }

    api.put(`/pets/${petId}`, data)
      .then(response => {
        alert('Pet atualizado com sucesso!');
        onClose();
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Editar Pet</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Idade:</label>
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Raça:</label>
            <input
              type="text"
              name="raca"
              value={formData.raca}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição:</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="adotado"
              checked={formData.adotado}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Adotado</label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Imagem:</label>
            <input
              type="file"
              name="imagem"
              onChange={handleChange}
              accept="image/*"
              className="w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetEditForm;
