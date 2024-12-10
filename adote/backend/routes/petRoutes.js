// backend/routes/pets.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const petController = require('../controllers/petController');
const auth = require('../middleware/auth');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Certifique-se de que a pasta 'uploads/' existe
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Remover espaços e caracteres especiais do nome do arquivo
    const sanitizedFilename = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
    cb(null, uniqueSuffix + '-' + sanitizedFilename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB para uploads
  fileFilter: function (req, file, cb) {
    // Filtrar apenas imagens (jpg, jpeg, png, gif)
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Apenas imagens (jpg, jpeg, png, gif) são permitidas.'));
  }
});

// Rota para cadastrar um novo pet
router.post('/', auth(), upload.single('imagem'), petController.createPet);

// Obter todos os pets
router.get('/', petController.getAllPets);

// Obter um pet por ID
router.get('/:id', petController.getPetById);

// Atualizar um pet por ID
router.put('/:id', auth(), upload.single('imagem'), petController.updatePet);

// Deletar um pet por ID
router.delete('/:id', auth(), petController.deletePet);

module.exports = router;
