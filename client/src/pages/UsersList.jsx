import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/auth/users?search=${search}`);
      setUsers(res.data);
    } catch (err) {
      console.error("Помилка при завантаженні користувачів", err);
    }
  };

  return (
    <div className="wrapper flex flex-col gap-4">
      <h2>Користувачі</h2>
      <Link to="/admin" className="btn-link">
        Назад
      </Link>

      <input
        type="text"
        placeholder="Введіть ім'я або телефон"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />

      <ul className="flex flex-col gap-2">
        {users.map((user) => (
          <li key={user._id} className="p-2 border rounded">
            <div>
              <strong>ПІБ:</strong> {user.fullName}
            </div>
            <div>
              <strong>Телефон:</strong> {user.phone}
            </div>
            <div>
              <strong>Дата народження:</strong>{" "}
              {new Date(user.birthDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Роль:</strong> {user.role}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
