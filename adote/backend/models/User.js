// backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definição do Schema para User
const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do usuário é obrigatório.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'O email do usuário é obrigatório.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Por favor, insira um email válido.'],
  },
  telefone: {
    type: String,
    required: [true, 'O telefone do usuário é obrigatório.'],
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Por favor, insira um telefone válido.'], // Validação básica de telefone
  },
  senha: {
    type: String,
    required: [true, 'A senha do usuário é obrigatória.'],
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres.'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: [true, 'O papel do usuário é obrigatório.'],
  },
  // Outros campos conforme necessário...
}, {
  timestamps: true,
});

// Middleware para criptografar a senha antes de salvar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar senhas
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.senha);
};

// Criação do modelo User a partir do Schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
