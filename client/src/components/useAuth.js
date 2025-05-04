import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return token ? jwtDecode(token) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("token");
      setToken(updatedToken);
      try {
        setUser(updatedToken ? jwtDecode(updatedToken) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      handleStorageChange();
    }, 400);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return { user, isAuthenticated: !!user };
}
