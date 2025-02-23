const mongoose = require('mongoose');

const palpiteSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jogoId: {
        type: Number,
        required: true
    },
    golsCasa: {
        type: Number,
        required: true
    },
    golsFora: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Palpite', palpiteSchema); 