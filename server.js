const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Configurações
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dados mockados dos jogos (depois virão do banco)
const jogos = [
    { id: 1, timeCasa: 'Real Madrid', timeFora: 'Manchester City', fase: 'Quartas' },
    { id: 2, timeCasa: 'Arsenal', timeFora: 'Bayern Munich', fase: 'Quartas' },
    // Adicione os outros jogos
];

// Rotas
app.get('/', (req, res) => {
    res.render('index', { jogos: jogos });
});

app.post('/salvar-palpites', (req, res) => {
    const palpites = req.body;
    console.log('Palpites recebidos:', palpites);
    // Aqui você salvará no banco de dados
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 