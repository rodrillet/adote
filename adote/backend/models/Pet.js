// backend/models/Pet.js

const mongoose = require('mongoose');

// Definição do Schema para Pet
const PetSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do pet é obrigatório.'],
    trim: true,
  },
  idade: {
    type: Number,
    required: [true, 'A idade do pet é obrigatória.'],
    min: [0, 'A idade não pode ser negativa.'],
  },
  raca: {
    type: String,
    required: [true, 'A raça do pet é obrigatória.'],
    trim: true,
  },
  descricao: {
    type: String,
    required: [true, 'A descrição do pet é obrigatória.'],
    trim: true,
  },
  tipo: {
    type: String,
    required: [true, 'O tipo do pet é obrigatório.'],
    enum: {
      values: ['Cachorro', 'Gato'],
      message: 'Tipo inválido. Deve ser "Cachorro" ou "Gato".',
    },
  },
  sexo: {
    type: String,
    required: [true, 'O sexo do pet é obrigatório.'],
    enum: {
      values: ['Masculino', 'Feminino'],
      message: 'Sexo inválido. Deve ser "Masculino" ou "Feminino".',
    },
  },
  castrado: {
    type: Boolean,
    default: false,
  },
  vacinado: {
    type: Boolean,
    default: false,
  },
  local: {
    type: String,
    required: [true, 'O local aproximado do pet é obrigatório.'],
    trim: true,
  },
  porte: {
    type: String,
    required: [true, 'O porte do pet é obrigatório.'],
    enum: {
      values: ['Pequeno', 'Médio', 'Grande'],
      message: 'Porte inválido. Deve ser "Pequeno", "Médio" ou "Grande".',
    },
  },
  dataNascimento: {
    type: Date,
    required: [true, 'A data de nascimento do pet é obrigatória.'],
  },
  peso: {
    type: Number,
    required: [true, 'O peso do pet é obrigatório.'],
    min: [0, 'O peso não pode ser negativo.'],
  },
  necessidadesEspeciais: {
    type: String,
    trim: true,
    default: '',
  },
  comportamento: {
    type: String,
    required: [true, 'O comportamento do pet é obrigatório.'],
    trim: true,
  },
  imagem: {
    type: String,
    trim: true,
    default: '',
  },
  adotado: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'O usuário que cadastrou o pet é obrigatório.'],
  },
}, {
  timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
});

// Criação do modelo Pet a partir do Schema
const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
