const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Arquivo para armazenar dados
const dataFile = path.join(__dirname, 'dados.json');

// Middleware para receber JSON
app.use(express.json());
app.use(express.static('public'));

// Função para ler dados do arquivo
function lerDados() {
  try {
    if (fs.existsSync(dataFile)) {
      const dados = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(dados);
    }
  } catch (erro) {
    console.error('Erro ao ler arquivo:', erro.message);
  }
  return [];
}

// Função para salvar dados no arquivo
function salvarDados(dados) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(dados, null, 2), 'utf8');
    console.log('Dados salvos com sucesso!');
  } catch (erro) {
    console.error('Erro ao salvar arquivo:', erro.message);
  }
}

// Rota de teste (GET)
app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor está rodando!' });
});

// Rota para receber dados (POST)
app.post('/upload', (req, res) => {
  try {
    const dados = req.body;
    console.log('Dados recebidos:', dados);
    
    // Adiciona timestamp
    dados.timestamp = new Date().toLocaleString('pt-BR');
    
    // Lê dados existentes
    let todosDados = lerDados();
    
    // Adiciona novo dado
    todosDados.push(dados);
    
    // Salva no arquivo
    salvarDados(todosDados);
    
    res.status(200).json({ 
      sucesso: true, 
      mensagem: 'Dados recebidos e salvos com sucesso!',
      dados_recebidos: dados 
    });
  } catch (erro) {
    res.status(400).json({ 
      sucesso: false, 
      erro: erro.message 
    });
  }
});

// Rota para obter todos os dados
app.get('/dados', (req, res) => {
  try {
    const dados = lerDados();
    res.json({ sucesso: true, dados: dados });
  } catch (erro) {
    res.status(400).json({ sucesso: false, erro: erro.message });
  }
});

// Rota para limpar todos os dados
app.delete('/dados', (req, res) => {
  try {
    salvarDados([]);
    res.json({ sucesso: true, mensagem: 'Dados limpados!' });
  } catch (erro) {
    res.status(400).json({ sucesso: false, erro: erro.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});