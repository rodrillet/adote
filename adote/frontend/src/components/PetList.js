// src/components/ListPets.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ListPets = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    api
      .get('/pets')
      .then((response) => setPets(response.data))
      .catch((error) => console.error('Erro ao buscar pets:', error));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAgeFilter = (e) => {
    setAgeFilter(e.target.value);
  };

  const handleGenderFilter = (e) => {
    setGenderFilter(e.target.value);
  };

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.raca.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAge =
      ageFilter === '' ||
      (ageFilter === '0-1' && pet.idade >= 0 && pet.idade <= 1) ||
      (ageFilter === '2-5' && pet.idade >= 2 && pet.idade <= 5) ||
      (ageFilter === '6+' && pet.idade >= 6);

    const matchesGender =
      genderFilter === '' ||
      pet.sexo.toLowerCase() === genderFilter.toLowerCase();

    return matchesSearch && matchesAge && matchesGender;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Cabeçalho */}
      <header className="bg-navbar-footer shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-3xl font-bold text-white">Adote um Amigo</h1>
          </Link>
          <nav className="flex space-x-4 items-center">
            <Link to="/listar">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Pets Disponíveis
              </button>
            </Link>
            <Link to="/cadastrar">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Cadastrar Pet
              </button>
            </Link>
            <Link to="/">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Home
              </button>
            </Link>
            {/* Botão para Voltar à Home (Landing Page) */}
            <Link to="/">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                Voltar para Home
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow">
        {/* Título da Página */}
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Lista de Pets Disponíveis para Adoção
          </h2>

          {/* Barra de Pesquisa e Filtros */}
          <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
            {/* Barra de Pesquisa */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Pesquisar por nome ou raça..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.25 4.5a7.5 7.5 0 016.4 11.15z"
                />
              </svg>
            </div>

            {/* Filtro de Idade */}
            <div>
              <select
                value={ageFilter}
                onChange={handleAgeFilter}
                className="w-full md:w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas as Idades</option>
                <option value="0-1">0-1 anos</option>
                <option value="2-5">2-5 anos</option>
                <option value="6+">6+ anos</option>
              </select>
            </div>

            {/* Filtro de Sexo */}
            <div>
              <select
                value={genderFilter}
                onChange={handleGenderFilter}
                className="w-full md:w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos os Sexos</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
          </div>

          {/* Grid de Pets */}
          {filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map((pet) => (
                <div
                  key={pet._id}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col transition-transform transform hover:scale-105"
                >
                  {pet.imagem && (
                    <img
                      src={`http://localhost:5000/uploads/${pet.imagem}`}
                      alt={pet.nome}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h4 className="text-xl font-bold mb-1">{pet.nome}</h4>
                  <p className="text-gray-600 text-sm">Raça: {pet.raca}</p>
                  <p className="text-gray-600 text-sm">Idade Estimada: {pet.idade} anos</p>
                  <p className="text-gray-600 text-sm">Tipo: {pet.tipo}</p>
                  <p className="text-gray-600 text-sm">Sexo: {pet.sexo}</p>
                  <p className="text-gray-600 text-sm">
                    Castrado: {pet.castrado ? 'Sim' : 'Não'}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Vacinado: {pet.vacinado ? 'Sim' : 'Não'}
                  </p>
                  <p className="text-gray-600 text-sm">Local Aproximado: {pet.local}</p>
                  <p className="text-gray-600 text-sm flex-grow">{pet.descricao}</p>
                  <p className="text-gray-600 text-sm mt-2">
                    <strong>Dono:</strong> {pet.user?.nome || 'Não informado'}
                  </p>
                  {/* Botão de WhatsApp */}
                  {pet.user?.telefone && (
                    <a
                      href={`https://wa.me/${pet.user.telefone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-center text-sm"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.52 3.48A11.81 11.81 0 0012 0a12 12 0 00-12 12 11.93 11.93 0 001.69 6L0 24l6.5-1.71A12 12 0 0012 24a11.81 11.81 0 008.52-3.48A11.81 11.81 0 0024 12a11.81 11.81 0 00-3.48-8.52zM12 22a9.94 9.94 0 01-5.28-1.5l-.38-.23-3.87 1 1-3.75-.25-.39A10 10 0 1122 12a9.93 9.93 0 01-10 10zm5.55-7.38c-.31-.16-1.84-.91-2.13-1s-.5-.16-.72.16-.83 1-.99 1.21-.37.24-.69.08a8.33 8.33 0 01-2.46-1.51 9.05 9.05 0 01-1.68-2.09c-.18-.31 0-.47.14-.62s.31-.36.47-.54a2.09 2.09 0 00.31-.52.55.55 0 000-.54c-.08-.16-.72-1.75-1-2.4s-.51-.54-.72-.55h-.6a1.15 1.15 0 00-.83.39 3.49 3.49 0 00-1.1 2.58 6.09 6.09 0 001.29 3.1 13.93 13.93 0 005.59 5.28 12.86 12.86 0 003.31 1.22 3.84 3.84 0 001.84.11 2.79 2.79 0 001.82-1.29 2.3 2.3 0 00.16-1.29c-.08-.08-.29-.16-.6-.31z" />
                      </svg>
                      Falar no WhatsApp
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Nenhum pet encontrado.</p>
          )}
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-navbar-footer">
        <div className="container mx-auto px-6 py-6 text-center">
          <p className="text-gray-200">
            © {new Date().getFullYear()} Adote um Amigo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ListPets;
