require('dotenv').config(); // Carrega as variáveis de ambiente

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servindo arquivos estáticos

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/pets', petRoutes);
app.use('/auth', authRoutes); // Adiciona o prefixo '/auth' para as rotas de autenticação

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
