import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./useAuth";

const Header = () => {
    const { user, isAuthenticated } = useAuth();
  return (
    <header className="fixed top-0 left-0 w-full border-b border-gray-300 bg-white z-999">
      <div className="flex justify-between items-center px-[2vw] py-[1vw]">
        <Link to="/" className="flex gap-4">
          <div className="flex items-center">
            <img src="/logo.svg" alt="logo" />
          </div>
          <h1 className="w-56">Київська міська поліклініка</h1>
        </Link>
        <nav className="flex gap-6">
          <Link to="/">
            Головна
          </Link>
          <Link to="/appointments">
            Записи
          </Link>
          {isAuthenticated && user?.role === "admin" && (
            <Link to="/admin" className="text-red-700">
              Адмін панель
            </Link>
          )}
          {!isAuthenticated ? (
            <>
              <Link to="/login">
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
