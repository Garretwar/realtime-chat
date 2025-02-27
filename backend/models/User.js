const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    counter_messages: { type: Number, default: 0 },
    last_messages: { type: [{ message: String, timestamp: Date }], default: [] } // 🔹 Додаємо історію останніх 10 повідомлень
});

module.exports = mongoose.model('User', userSchema);
