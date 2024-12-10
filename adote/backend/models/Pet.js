// routes/pets.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const Pet = require('../models/Pet');
const auth = require('../middleware/auth'); // Middleware de autenticação

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Rota para cadastrar um novo pet
router.post('/', auth, upload.single('imagem'), async (req, res) => {
  console.log("Recebendo requisição para criar pet"); // Log inicial

  try {
    const {
      nome,
      idade,
      raca,
      descricao,
      tipo,
      sexo,
      castrado,
      vacinado,
      local,
      porte,
      dataNascimento,
      peso,
      necessidadesEspeciais,
      comportamento,
    } = req.body;

    console.log("Dados recebidos:", req.body); // Log de dados recebidos
    if (req.file) console.log("Imagem recebida:", req.file.filename); // Log para a imagem

    if (
      !nome || !idade || !raca || !descricao || !tipo ||
      !sexo || !local || !porte || !dataNascimento ||
      !peso || !comportamento
    ) {
      return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const novoPet = new Pet({
      nome,
      idade,
      raca,
      descricao,
      tipo,
      sexo,
      castrado: castrado === 'true',
      vacinado: vacinado === 'true',
      local,
      porte,
      dataNascimento,
      peso,
      necessidadesEspeciais,
      comportamento,
      imagem: req.file ? req.file.filename : null,
      user: req.user ? req.user.id : null,
    });

    await novoPet.save();
    console.log("Pet cadastrado com sucesso:", novoPet); // Log de sucesso
    res.status(201).json({ mensagem: 'Pet cadastrado com sucesso!', pet: novoPet });
  } catch (error) {
    console.error('Erro ao cadastrar pet:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

module.exports = router;
