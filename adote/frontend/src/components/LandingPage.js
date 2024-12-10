// src/components/LandingPage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/banner.png';
import api from '../services/api';

const LandingPage = () => {
  const [pets, setPets] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    api
      .get('/pets')
      .then((response) => setPets(response.data))
      .catch((error) => console.error('Erro ao buscar pets:', error));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Cabeçalho */}
      <header className="bg-blue-600 shadow">
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
            {token ? (
              <>
                <Link to="/cadastrar">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Cadastrar Pet
                  </button>
                </Link>
                {/* Botão de Logout Estilizado */}
                <button
                  onClick={handleLogout}
                  className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                  aria-label="Sair"
                >
                  <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                      <path d="M20.52 3.48A11.81 11.81 0 0012 0a12 12 0 00-12 12 11.93 11.93 0 001.69 6L0 24l6.5-1.71A12 12 0 0012 24a11.81 11.81 0 008.52-3.48A11.81 11.81 0 0024 12a11.81 11.81 0 00-3.48-8.52zM12 22a9.94 9.94 0 01-5.28-1.5l-.38-.23-3.87 1 1-3.75-.25-.39A10 10 0 1122 12a9.93 9.93 0 01-10 10zm5.55-7.38c-.31-.16-1.84-.91-2.13-1s-.5-.16-.72.16-.83 1-.99 1.21-.37.24-.69.08a8.33 8.33 0 01-2.46-1.51 9.05 9.05 0 01-1.68-2.09c-.18-.31 0-.47.14-.62s.31-.36.47-.54a2.09 2.09 0 00.31-.52.a55.55 0 000-.54c-.08-.16-.72-1.75-1-2.4s-.51-.54-.72-.55h-.6a1.15 1.15 0 00-.83.39 3.49 3.49 0 00-1.1 2.58 6.09 6.09 0 001.29 3.1 13.93 13.93 0 005.59 5.28 12.86 12.86 0 003.31 1.22 3.84 3.84 0 001.84.11 2.79 2.79 0 001.82-1.29 2.3 2.3 0 00.16-1.29c-.08-.08-.29-.16-.6-.31z" />
                    </svg>
                  </div>
                  <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Registrar-se
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Login
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Banner */}
      <div className="w-full">
        <img src={banner} alt="Banner" className="w-full h-auto" />
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-grow">
        {/* Seção Hero */}
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Encontre seu novo melhor amigo
          </h2>
          <p className="text-gray-600 mb-8">
            Junte-se a nós na missão de encontrar um lar amoroso para todos os pets.
          </p>
          <Link to="/listar">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Ver Pets Disponíveis
            </button>
          </Link>
        </div>

        {/* Seção de Benefícios */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Por que Adotar Conosco?
            </h3>
            <div className="flex flex-wrap justify-center">
              {/* Benefício 1 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col h-full transition-transform transform hover:scale-105">
                  <h4 className="text-xl font-bold mb-2">Adoção Responsável</h4>
                  <p className="text-gray-600 flex-grow">
                    Conectamos pets a famílias que oferecem amor e cuidado.
                  </p>
                </div>
              </div>
              {/* Benefício 2 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col h-full transition-transform transform hover:scale-105">
                  <h4 className="text-xl font-bold mb-2">Transparência</h4>
                  <p className="text-gray-600 flex-grow">
                    Informações completas sobre cada pet disponível para adoção.
                  </p>
                </div>
              </div>
              {/* Benefício 3 */}
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="p-6 bg-gray-100 rounded-lg shadow flex flex-col h-full transition-transform transform hover:scale-105">
                  <h4 className="text-xl font-bold mb-2">Comunidade</h4>
                  <p className="text-gray-600 flex-grow">
                    Faça parte de uma rede de pessoas comprometidas com o bem-estar animal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Pets */}
        <div className="container mx-auto px-6 py-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Nossos Pets para Adoção
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col transition-transform transform hover:scale-105"
              >
                {pet.imagem && (
                  <img
                    src={`http://localhost:5000/uploads/${pet.imagem}`}
                    alt={pet.nome}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h4 className="text-xl font-bold mb-2">{pet.nome}</h4>
                <p className="text-gray-600">Raça: {pet.raca}</p>
                <p className="text-gray-600">Idade: {pet.idade} anos</p>
                <p className="text-gray-600">Tipo: {pet.tipo}</p>
                <p className="text-gray-600 flex-grow">{pet.descricao}</p>
                <p className="text-gray-600 mt-2">
                  <strong>Dono:</strong> {pet.user?.nome || 'Não informado'}
                </p>
                {/* Botão de WhatsApp */}
                {pet.user?.telefone && (
                  <a
                    href={`https://wa.me/${pet.user.telefone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.52 3.48A11.81 11.81 0 0012 0a12 12 0 00-12 12 11.93 11.93 0 001.69 6L0 24l6.5-1.71A12 12 0 0012 24a11.81 11.81 0 008.52-3.48A11.81 11.81 0 0024 12a11.81 11.81 0 00-3.48-8.52zM12 22a9.94 9.94 0 01-5.28-1.5l-.38-.23-3.87 1 1-3.75-.25-.39A10 10 0 1122 12a9.93 9.93 0 01-10 10zm5.55-7.38c-.31-.16-1.84-.91-2.13-1s-.5-.16-.72.16-.83 1-.99 1.21-.37.24-.69.08a8.33 8.33 0 01-2.46-1.51 9.05 9.05 0 01-1.68-2.09c-.18-.31 0-.47.14-.62s.31-.36.47-.54a2.09 2.09 0 00.31-.52.a55.55 0 000-.54c-.08-.16-.72-1.75-1-2.4s-.51-.54-.72-.55h-.6a1.15 1.15 0 00-.83.39 3.49 3.49 0 00-1.1 2.58 6.09 6.09 0 001.29 3.1 13.93 13.93 0 005.59 5.28 12.86 12.86 0 003.31 1.22 3.84 3.84 0 001.84.11 2.79 2.79 0 001.82-1.29 2.3 2.3 0 00.16-1.29c-.08-.08-.29-.16-.6-.31z" />
                    </svg>
                    Falar no WhatsApp
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-blue-600">
        <div className="container mx-auto px-6 py-6 text-center">
          <p className="text-gray-200">
            © {new Date().getFullYear()} Adote um Amigo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
