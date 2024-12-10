// frontend/src/components/PetForm.js

import React, { useState, useRef } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const PetForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Referências para os campos do formulário
  const nomeRef = useRef('');
  const idadeRef = useRef('');
  const racaRef = useRef('');
  const descricaoRef = useRef('');
  const tipoRef = useRef('Cachorro');
  const sexoRef = useRef('Masculino');
  const castradoRef = useRef(false);
  const vacinadoRef = useRef(false);
  const localRef = useRef('');
  const porteRef = useRef('Médio');
  const dataNascimentoRef = useRef('');
  const pesoRef = useRef('');
  const necessidadesEspeciaisRef = useRef('');
  const comportamentoRef = useRef('');
  const imagemRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem({ tipo: '', texto: '' });
  
    const token = localStorage.getItem('token');
    if (!token) {
      setMensagem({ tipo: 'erro', texto: 'Você precisa estar logado para cadastrar um pet.' });
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    if (nomeRef.current) formData.append('nome', nomeRef.current.value);
    if (idadeRef.current) formData.append('idade', idadeRef.current.value);
    if (racaRef.current) formData.append('raca', racaRef.current.value);
    if (descricaoRef.current) formData.append('descricao', descricaoRef.current.value);
    if (tipoRef.current) formData.append('tipo', tipoRef.current.value);
    if (sexoRef.current) formData.append('sexo', sexoRef.current.value);
    if (castradoRef.current) formData.append('castrado', castradoRef.current.checked);
    if (vacinadoRef.current) formData.append('vacinado', vacinadoRef.current.checked);
    if (localRef.current) formData.append('local', localRef.current.value);
    if (porteRef.current) formData.append('porte', porteRef.current.value);
    if (dataNascimentoRef.current) formData.append('dataNascimento', dataNascimentoRef.current.value);
    if (pesoRef.current) formData.append('peso', pesoRef.current.value);
    if (necessidadesEspeciaisRef.current) formData.append('necessidadesEspeciais', necessidadesEspeciaisRef.current.value);
    if (comportamentoRef.current) formData.append('comportamento', comportamentoRef.current.value);
    if (imagemRef.current && imagemRef.current.files[0]) {
      formData.append('imagem', imagemRef.current.files[0]);
    }

    // Logs para depuração
    console.log("FormData Enviado:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      const response = await api.post('/pets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMensagem({ tipo: 'sucesso', texto: 'Pet cadastrado com sucesso!' });
      setTimeout(() => navigate('/listar'), 2000);
    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      const mensagemErro = error.response?.data?.mensagem || 'Erro ao cadastrar pet. Tente novamente.';
      setMensagem({ tipo: 'erro', texto: mensagemErro });
    } finally {
      setLoading(false);
    }
  };

  const Step1 = () => (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Dados Básicos</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="nome">
          Nome <span className="text-red-500">*</span>
        </label>
        <input ref={nomeRef} type="text" id="nome" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="Ex: Thor" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="idade">
          Idade Estimada (anos) <span className="text-red-500">*</span>
        </label>
        <input ref={idadeRef} type="number" id="idade" required min="0" placeholder="Ex: 3" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="raca">
          Raça <span className="text-red-500">*</span>
        </label>
        <input ref={racaRef} type="text" id="raca" required placeholder="Ex: Labrador" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="tipo">
          Tipo <span className="text-red-500">*</span>
        </label>
        <select ref={tipoRef} id="tipo" required className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="sexo">
          Sexo <span className="text-red-500">*</span>
        </label>
        <select ref={sexoRef} id="sexo" required className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={nextStep} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors">
          Próxima Etapa
        </button>
      </div>
    </div>
  );

  const Step2 = () => (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Detalhes Adicionais</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="porte">
          Porte <span className="text-red-500">*</span>
        </label>
        <select ref={porteRef} id="porte" required className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
          <option value="Pequeno">Pequeno</option>
          <option value="Médio">Médio</option>
          <option value="Grande">Grande</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="dataNascimento">
          Data de Nascimento <span className="text-red-500">*</span>
        </label>
        <input ref={dataNascimentoRef} type="date" id="dataNascimento" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="peso">
          Peso (kg) <span className="text-red-500">*</span>
        </label>
        <input ref={pesoRef} type="number" id="peso" required min="0" step="0.1" placeholder="Ex: 15.5" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
      </div>
      <div className="flex items-center mb-4">
        <input ref={castradoRef} type="checkbox" id="castrado" className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
        <label htmlFor="castrado" className="ml-3 block text-gray-700 font-medium">Castrado</label>
      </div>
      <div className="flex items-center mb-6">
        <input ref={vacinadoRef} type="checkbox" id="vacinado" className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
        <label htmlFor="vacinado" className="ml-3 block text-gray-700 font-medium">Vacinado</label>
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={prevStep} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-colors">
          Etapa Anterior
        </button>
        <button type="button" onClick={nextStep} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors">
          Próxima Etapa
        </button>
      </div>
    </div>
  );

  const Step3 = () => (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Informações Finais</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="local">
          Local Aproximado <span className="text-red-500">*</span>
        </label>
        <input ref={localRef} type="text" id="local" required placeholder="Ex: Bairro Jardim, Cidade XYZ" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="necessidadesEspeciais">
          Necessidades Especiais
        </label>
        <textarea ref={necessidadesEspeciaisRef} id="necessidadesEspeciais" rows="3" placeholder="Descreva quaisquer necessidades especiais do pet..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="comportamento">
          Comportamento <span className="text-red-500">*</span>
        </label>
        <textarea ref={comportamentoRef} id="comportamento" rows="3" required placeholder="Descreva o comportamento do pet (ex: amigável, tímido, ativo)..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="descricao">
          Descrição <span className="text-red-500">*</span>
        </label>
        <textarea ref={descricaoRef} id="descricao" rows="4" required placeholder="Descreva características, personalidade, etc." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"></textarea>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="imagem">
          Imagem <span className="text-red-500">*</span>
        </label>
        <input ref={imagemRef} type="file" id="imagem" accept="image/*" required className="w-full text-gray-700" />
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={prevStep} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-colors">
          Etapa Anterior
        </button>
        <button type="submit" disabled={loading} className={`px-6 py-3 font-semibold text-white rounded-lg transition-colors ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'}`}>
          {loading ? 'Cadastrando...' : 'Cadastrar Pet'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-10 bg-gray-100 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
          {mensagem.texto && (
            <div className={`mb-6 p-4 rounded-lg ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {mensagem.texto}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
          </form>
        </div>
      </div>
    </>
  );
};

export default PetForm;
