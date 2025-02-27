# 📢 MERN Chat App

🔥 **MERN Stack Real-time Chat App** — це повнофункціональний чат, створений на основі **MongoDB, Express, React, Node.js та Socket.io**. Додаток підтримує **живі повідомлення**, **авторизацію**, **збереження історії чату** та **реактивний UI**.

## 🚀 Фічі
✅ **Реєстрація / Авторизація** (JWT, localStorage)  
✅ **Живі повідомлення** (Socket.io)  
✅ **Збереження історії чату** (MongoDB, 50 останніх повідомлень)  
✅ **Система користувачів** (Логін, Вихід, Збереження сесій)  
✅ **Реактивний UI** (React + React Router)  
✅ **Захист API** (CORS, middleware)  
✅ **Легка інтеграція** (REST API + WebSockets)  

---

## 🛠 Технології
- **MongoDB** – база даних
- **Express.js** – серверна частина
- **React.js** – клієнтська частина
- **Node.js** – серверний рушій
- **Socket.io** – WebSockets для живого чату
- **JWT** – аутентифікація користувачів

---

## 📌 Як запустити локально?

### 1️⃣ Клонувати репозиторій
```sh
git clone https://github.com/your-username/mern-chat-app.git
cd mern-chat-app
```

### 2️⃣ Встановити залежності
```sh
cd backend && npm install
cd ../frontend && npm install
```

### 3️⃣ Запустити сервер
```sh
cd backend
npm run dev
```

### 4️⃣ Запустити клієнт
```sh
cd ../frontend
npm run dev
```

🔹 **Фронтенд:** `http://localhost:5173`  
🔹 **Бекенд:** `http://localhost:5000`  

---

## 🔧 Конфігурація `.env`
Створи файл `.env` у папці `backend` та додай:
```
MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/your_db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 📜 API Маршрути
### 🔹 **Аутентифікація**
| Метод | Маршрут | Опис |
|--------|---------|-------------|
| POST | `/api/auth/register` | Реєстрація нового користувача |
| POST | `/api/auth/login` | Логін користувача |

### 🔹 **Повідомлення**
| Метод | Маршрут | Опис |
|--------|---------|-------------|
| GET | `/api/messages` | Отримати останні 50 повідомлень |
| POST | `/api/messages` | Надіслати нове повідомлення (через Socket.io) |

---

## 💡 Автор
🔹 **Created by:** [Your Name](https://github.com/your-username)  
📧 Email: your-email@example.com

---

## 📜 Ліцензія
MIT License © 2025

