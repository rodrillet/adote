// src/components/Navbar.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Importação corrigida para Heroicons 2.1.5

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Função para lidar com logout (se aplicável)
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              {/* Substitua o texto abaixo pelo seu logo se tiver um */}
              <img
                className="h-8 w-8 mr-2"
                src="/logo192.png" // Substitua pelo caminho do seu logo
                alt="Logo"
              />
              <span className="font-bold text-xl text-gray-800">Adote um Amigo</span>
            </Link>
          </div>

          {/* Links de Navegação (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Início
            </Link>
            <Link
              to="/listar"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Pets Disponíveis
            </Link>
            <Link
              to="/cadastrar"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Cadastrar Pet
            </Link>
            {/* Botão de Logout */}
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Menu Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Links de Navegação (Mobile) */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Início
            </Link>
            <Link
              to="/listar"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Pets Disponíveis
            </Link>
            <Link
              to="/cadastrar"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Cadastrar Pet
            </Link>
            {/* Botão de Logout */}
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="block text-left w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
