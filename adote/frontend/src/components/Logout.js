// src/components/Logout.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('Logout realizado com sucesso!');
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default Logout;
