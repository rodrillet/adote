// backend/routes/petsRoutes.js

const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const multer = require('multer');
const auth = require('../middleware/auth'); // Middleware de autenticação

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Rotas para Pets

// Criar um novo pet (requer autenticação)
router.post('/', auth, (req, res, next) => {
  upload.single('imagem')(req, res, (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
    next();
  });
}, petController.createPet);

// Obter todos os pets
router.get('/', petController.getAllPets);

// Obter um pet por ID
router.get('/:id', petController.getPetById);

// Atualizar um pet por ID (requer autenticação)
router.put('/:id', auth, (req, res, next) => {
  upload.single('imagem')(req, res, (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao fazer upload da imagem' });
    next();
  });
}, petController.updatePet);

// Deletar um pet por ID (requer autenticação)
router.delete('/:id', auth, petController.deletePet);

module.exports = router;
