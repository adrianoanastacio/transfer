const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para receber JSON
app.use(express.json());

// Rota de teste (GET)
app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor está rodando!' });
});

// Rota para receber dados (POST)
app.post('/upload', (req, res) => {
  try {
    const dados = req.body;
    console.log('Dados recebidos:', dados);
    
    res.status(200).json({ 
      sucesso: true, 
      mensagem: 'Dados recebidos com sucesso!',
      dados_recebidos: dados 
    });
  } catch (erro) {
    res.status(400).json({ 
      sucesso: false, 
      erro: erro.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});