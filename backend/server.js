const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Вказуємо правильний фронтенд-порт
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(cors());

// Підключення до MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected!");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};
connectDB();

// WebSocket підключення
io.on("connection", (socket) => {
    console.log(`🔌 Користувач підключився: ${socket.id}`);

    socket.on("sendMessage", async ({ username, userId, message }) => {
        if (!message.trim()) return; // Перевіряємо, чи не порожнє повідомлення

        try {
            const newMessage = new Message({ username, userId, message });
            await newMessage.save();

            // Видаляємо найстаріші повідомлення, якщо більше 50
            const totalMessages = await Message.countDocuments();
            if (totalMessages > 50) {
                await Message.findOneAndDelete({}, { sort: { timestamp: 1 } });
            }

            io.emit("receiveMessage", { username, message });
        } catch (error) {
            console.error("❌ Помилка збереження повідомлення:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log(`❌ Користувач відключився: ${socket.id}`);
    });
});

// Маршрут для отримання останніх 50 повідомлень
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
        res.json(messages.reverse()); // Відправляємо у хронологічному порядку
    } catch (err) {
        console.error("❌ [Server Error] Помилка отримання повідомлень:", err);
        res.status(500).json({ error: "Помилка отримання повідомлень" });
    }
});

// Підключаємо маршрути для аутентифікації
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Сервер запущений на порту ${PORT}`));
