import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="flex flex-col wrapper gap-6">
      <h2>Панель адміністратора</h2>
      <Link className="btn-link" to="/admin/users">
        Користувачі
      </Link>
      <Link className="btn-link" to="/admin/appoinments">
        Записи
      </Link>
      <Link className="btn-link" to="/admin/specializations">
        Спеціалізації
      </Link>
      <Link className="btn-link" to="/admin/doctors">
        Доктори
      </Link>
      <Link className="btn-link" to="/admin/schedules">
        Графіки
      </Link>
    </div>
  );
};

export default AdminPanel;
