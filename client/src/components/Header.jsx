import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

const Header = () => {
    const { user, isAuthenticated } = useAuth();
  return (
    <header className="fixed top-0 left-0 w-full border-b border-gray-300 bg-white">
      <div className="flex justify-between items-center px-[2vw] py-[1vw]">
        <Link to="/" className="flex gap-4">
          <div className="flex items-center">
            <img src="/logo.svg" alt="logo" />
          </div>
          <h1 className="w-56">Київська міська поліклініка</h1>
        </Link>
        <nav>
          <Link to="/" style={{ marginRight: "10px" }}>
            Головна
          </Link>
          <Link to="/appointments" style={{ marginRight: "10px" }}>
            Записи
          </Link>
          {isAuthenticated && user?.role === "admin" && (
            <Link to="/admin" style={{ marginRight: "10px", color: "red" }}>
              Адмін панель
            </Link>
          )}
          {!isAuthenticated ? (
            <>
              <Link to="/login" style={{ marginRight: "10px" }}>
                Увійти
              </Link>
              <Link to="/register">Зареєструватись</Link>
            </>
          ) : (
            <Link to="/account">Акаунт</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
