import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("📩 [Login] Надсилаємо запит на сервер...");
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      console.log("✅ [Login] Отримані дані від сервера:", res.data);
      
      loginUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("❌ [Login] Помилка входу:", err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Вхід</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
}

export default Login;
