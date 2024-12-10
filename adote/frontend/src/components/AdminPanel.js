// src/components/AdminPanel.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PetEditForm from './PetEditForm';

const AdminPanel = () => {
  const [pets, setPets] = useState([]);
  const [editingPetId, setEditingPetId] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    api.get('/pets')
      .then(response => setPets(response.data))
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar este pet?')) {
      api.delete(`/pets/${id}`)
        .then(() => {
          setPets(pets.filter(pet => pet._id !== id));
          alert('Pet deletado com sucesso!');
        })
        .catch(error => console.error(error));
    }
  };

  const handleEdit = (id) => {
    setEditingPetId(id);
  };

  const closeEditForm = () => {
    setEditingPetId(null);
    fetchPets(); // Atualiza a lista após a edição
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Painel do Administrador</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>
      {editingPetId && (
        <PetEditForm petId={editingPetId} onClose={closeEditForm} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pets.map(pet => (
          <div key={pet._id} className="bg-white p-6 rounded shadow">
            {pet.imagem && (
              <img
                src={`http://localhost:5000/uploads/${pet.imagem}`}
                alt={pet.nome}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-2xl font-bold mb-2">{pet.nome}</h3>
            <p className="text-gray-700">Idade: {pet.idade}</p>
            <p className="text-gray-700">Raça: {pet.raca}</p>
            <p className="text-gray-700 mb-4">Descrição: {pet.descricao}</p>
            <p className="text-gray-700 font-semibold">Adotado: {pet.adotado ? 'Sim' : 'Não'}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEdit(pet._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(pet._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
