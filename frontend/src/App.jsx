import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

import Register from "./pages/Register";
import Login from "./pages/Login";

const socket = io("http://localhost:5000", { transports: ["websocket"] }); // 🔹 Використовуємо `websocket` напряму

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔹 Додаємо стан завантаження

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 🔹 Завантажуємо всі повідомлення (тільки один раз!)
    axios.get("http://localhost:5000/api/data")
      .then(res => {
        setMessages(res.data);
        setLoading(false); // 🔹 Завантаження завершено
      })
      .catch(err => {
        console.error("❌ Помилка отримання повідомлень:", err);
        setLoading(false);
      });

    return () => {
      socket.disconnect(); // 🔹 Видаляємо WebSocket при виході
    };
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [...prev, msg].slice(-50));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const payload = {
        username: user ? user.username : "Анонім",
        userId: user ? user.id : null,
        message
      };
      socket.emit("sendMessage", payload);
      setMessage("");
    }
  };

  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <nav>
        <h1>MERN Stack Chat</h1>
        <ul>
          <li><Link to="/">Головна</Link></li>
          {!user ? (
            <>
              <li><Link to="/register">Реєстрація</Link></li>
              <li><Link to="/login">Вхід</Link></li>
            </>
          ) : (
            <li><button onClick={logoutUser}>Вийти</button></li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={
          <div>
            <h2>Загальний чат</h2>
            {loading ? (
              <p>Завантаження...</p> // 🔹 Показуємо текст, поки дані завантажуються
            ) : (
              <>
                <p>Ви {user ? `увійшли як ${user.username}` : "не зареєстровані"}</p>
                
                <input 
                  type="text" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Введіть повідомлення..."
                />
                <button onClick={sendMessage}>Надіслати</button>

                <h3>📜 Останні 50 повідомлень:</h3>
                <ul>
                  {messages.map((msg, index) => (
                    <li key={index}>
                      <strong>{msg.username}:</strong> {msg.message}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
