import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { deleteAccount } from "../services/auth";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async () => {
    if (confirm("Ви впевнені, що хочете видалити акаунт?")) {
      const res = await deleteAccount(token);
      if (res.message) {
        localStorage.removeItem("token");
        navigate("/register");
      } else {
        alert("Помилка при видаленні акаунту");
      }
    }
  };

  if (!user)
    return (
      <div>
        <h1>Будь ласка, увійдіть в акаунт.</h1>
      </div>
    );

  return (
    <div className="wrapper flex flex-col gap-4">
      <h1>Привіт, {user.fullName}!</h1>
      <button className="btn" onClick={handleLogout}>Вийти</button>
      <button
      className="btn"
        onClick={handleDelete}
      >
        Видалити акаунт
      </button>
    </div>
  );
}
