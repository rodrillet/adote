// backend/index.js

require('dotenv').config(); // Carrega as variáveis de ambiente

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes'); // Corrigido para './routes/pets'
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuário

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servindo arquivos estáticos

// Verificar as variáveis de ambiente
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

// Definir a string de conexão com valor padrão
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Adote';

// Opções de conexão recomendadas (sem opções obsoletas)
const options = {};

// Conectar ao MongoDB
mongoose.connect(mongoURI, options)
  .then(() => {
    console.log(`Conectado ao MongoDB na URI: ${mongoURI}`);
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Rotas
app.use('/pets', petRoutes);
app.use('/auth', authRoutes); // Adiciona o prefixo '/auth' para as rotas de autenticação
app.use('/users', userRoutes); // Adiciona o prefixo '/users' para as rotas de usuário

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
