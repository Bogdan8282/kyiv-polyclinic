import { useState } from "react";
import { register } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    birthDate: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.fullName.trim()) return "Введіть ПІБ.";
    if (!/^380\d{9}$/.test(form.phone.replace(/\D/g, ""))) {
      return "Введіть правильний номер телефону.";
    }
    if (!form.birthDate) return "Введіть дату народження.";
    const age =
      new Date().getFullYear() - new Date(form.birthDate).getFullYear();
    if (age < 14) return "Вам має бути щонайменше 14 років.";
    if (form.password.length < 6)
      return "Пароль має містити щонайменше 6 символів.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setError("");
    const res = await register(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      setError(res.message || res.error || "Помилка при реєстрації.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="ПІБ"
          value={form.fullName}
          onChange={handleChange}
        />
        <PhoneInput
          country={"ua"}
          onlyCountries={["ua"]}
          masks={{ ua: "(..) ...-..-.." }}
          value={form.phone}
          onChange={(phone) => setForm({ ...form, phone })}
          inputProps={{
            name: "phone",
            required: true,
            placeholder: "Телефон",
          }}
        />
        <input
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Зареєструватись</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div>
        <p>Вже маєте акаунт?</p>
        <div className="btn-link">
          <Link to="/login">Увійти</Link>
        </div>
      </div>
    </div>
  );
}
