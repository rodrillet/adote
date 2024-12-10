// backend/controllers/petController.js

const Pet = require('../models/Pet');

// Criar um novo pet
exports.createPet = async (req, res) => {
  try {
    const { nome, idade, raca, descricao, tipo, sexo, castrado, vacinado, local, porte, dataNascimento, peso, necessidadesEspeciais, comportamento } = req.body;
    const imagem = req.file ? req.file.filename : null;

    const newPet = new Pet({
      nome,
      idade,
      raca,
      descricao,
      tipo,
      sexo,
      castrado: castrado === 'true', // Convertendo para booleano
      vacinado: vacinado === 'true', // Convertendo para booleano
      local,
      porte,
      dataNascimento,
      peso,
      necessidadesEspeciais,
      comportamento,
      imagem,
      adotado: false,
      user: req.user.id // Associa o pet ao usuário autenticado
    });

    await newPet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter todos os pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('user', 'nome telefone');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter um pet por ID
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('user', 'nome telefone');
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar um pet por ID
exports.updatePet = async (req, res) => {
  try {
    const { nome, idade, raca, descricao, adotado, sexo, castrado, vacinado, local, porte, dataNascimento, peso, necessidadesEspeciais, comportamento } = req.body;
    const imagem = req.file ? req.file.filename : null;

    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }

    if (pet.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    pet.nome = nome || pet.nome;
    pet.idade = idade || pet.idade;
    pet.raca = raca || pet.raca;
    pet.descricao = descricao || pet.descricao;
    pet.sexo = sexo || pet.sexo;
    pet.castrado = castrado === undefined ? pet.castrado : castrado === 'true';
    pet.vacinado = vacinado === undefined ? pet.vacinado : vacinado === 'true';
    pet.local = local || pet.local;
    pet.porte = porte || pet.porte;
    pet.dataNascimento = dataNascimento || pet.dataNascimento;
    pet.peso = peso || pet.peso;
    pet.necessidadesEspeciais = necessidadesEspeciais || pet.necessidadesEspeciais;
    pet.comportamento = comportamento || pet.comportamento;
    pet.adotado = adotado === 'true' ? true : adotado === 'false' ? false : pet.adotado;
    if (imagem) {
      pet.imagem = imagem;
    }

    await pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar um pet por ID
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }

    if (pet.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    await pet.remove();
    res.json({ message: 'Pet deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
