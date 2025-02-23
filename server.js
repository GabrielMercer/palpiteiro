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
    // Confronto 1
    { id: 1, timeCasa: 'Arsenal', timeFora: 'PSV', fase: 'Oitavas' },
    { id: 2, timeCasa: 'PSV', timeFora: 'Arsenal', fase: 'Oitavas Volta' },
    
    // Confronto 2
    { id: 3, timeCasa: 'Real Madrid', timeFora: 'Atletico de Madrid', fase: 'Oitavas' },
    { id: 4, timeCasa: 'Atletico de Madrid', timeFora: 'Real Madrid', fase: 'Oitavas Volta' },
    
    // Confronto 3
    { id: 5, timeCasa: 'Paris', timeFora: 'Liverpool', fase: 'Oitavas' },
    { id: 6, timeCasa: 'Liverpool', timeFora: 'Paris', fase: 'Oitavas Volta' },
    
    // Confronto 4
    { id: 7, timeCasa: 'Club Brugge', timeFora: 'Aston Villa', fase: 'Oitavas' },
    { id: 8, timeCasa: 'Aston Villa', timeFora: 'Club Brugge', fase: 'Oitavas Volta' },
    
    // Confronto 5
    { id: 9, timeCasa: 'Benfica', timeFora: 'Barcelona', fase: 'Oitavas' },
    { id: 10, timeCasa: 'Barcelona', timeFora: 'Benfica', fase: 'Oitavas Volta' },
    
    // Confronto 6
    { id: 11, timeCasa: 'Dortmund', timeFora: 'Lille', fase: 'Oitavas' },
    { id: 12, timeCasa: 'Lille', timeFora: 'Dortmund', fase: 'Oitavas Volta' },
    
    // Confronto 7
    { id: 13, timeCasa: 'Bayern Munich', timeFora: 'Bayer Leverkusen', fase: 'Oitavas' },
    { id: 14, timeCasa: 'Bayer Leverkusen', timeFora: 'Bayern Munich', fase: 'Oitavas Volta' },
    
    // Confronto 8
    { id: 15, timeCasa: 'Feyenoord', timeFora: 'Inter', fase: 'Oitavas' },
    { id: 16, timeCasa: 'Inter', timeFora: 'Feyenoord', fase: 'Oitavas Volta' }
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