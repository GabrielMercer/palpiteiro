require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/User');
const Palpite = require('./models/Palpite');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');

const app = express();

// Configurações
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Adicione configuração de sessão
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

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

// Rotas de autenticação
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        req.session.token = token;
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Proteger rota principal
app.get('/', auth, (req, res) => {
    res.render('index', { 
        jogos: jogos,
        user: req.user 
    });
});

// Salvar palpites
app.post('/salvar-palpites', auth, async (req, res) => {
    try {
        const palpites = req.body;
        
        // Converter palpites para o formato do banco
        const palpitesParaSalvar = Object.entries(palpites).map(([key, valor]) => {
            const [tipo, jogoId, campo] = key.split('_');
            return {
                usuario: req.user.userId,
                jogoId: parseInt(jogoId),
                golsCasa: parseInt(valor),
                golsFora: parseInt(palpites[`${tipo}_${jogoId}_fora`])
            };
        });

        // Salvar palpites
        await Palpite.insertMany(palpitesParaSalvar);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao salvar palpites:', error);
        res.status(500).json({ error: 'Erro ao salvar palpites' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 