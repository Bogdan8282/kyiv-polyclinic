import { useState } from "react";
import { login } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setError("Усі поля обовʼязкові.");
      return;
    }

    setError("");
    const res = await login({ identifier, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      setError(res.error || "Помилка входу.");
    }
  };

  return (
    <div className="wrapper flex flex-col gap-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          placeholder="ПІБ або телефон"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" type="submit">Увійти</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div className="flex gap-4 items-center">
        <p>Немає акаунту?</p>
        <div className="btn-link">
          <Link to="/register">Зареєструватись</Link>
        </div>
      </div>
    </div>
  );
}
