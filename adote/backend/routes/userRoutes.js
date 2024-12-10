// backend/routes/userRoutes.js 

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // Importando o middleware de autenticação

// Rota para obter informações do usuário autenticado
router.get('/me', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-senha'); // Excluir a senha da resposta
    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

module.exports = router;
