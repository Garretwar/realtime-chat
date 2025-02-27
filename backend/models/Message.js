const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, index: true } // 🔹 Додаємо індекс
});

module.exports = mongoose.model('Message', messageSchema);
