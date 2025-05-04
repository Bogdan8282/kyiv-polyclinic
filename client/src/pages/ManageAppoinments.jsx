import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await api.get("/appointments/all");
    setAppointments(res.data);
  };

  const handleCancel = async (id) => {
    await api.delete(`/appointments/${id}`);
    fetchAppointments();
  };

  return (
    <div className="wrapper flex flex-col gap-4">
      <h2>Всі записи</h2>
      <div className="btn-link">
        <Link to="/admin">Назад</Link>
      </div>
      <ul className="flex flex-col gap-2">
        {appointments.map((app) => (
          <li key={app._id}>
            Запис від {app.user?.fullName} до {app.doctor?.name}, {app.date} -{" "}
            {app.time}{" "}
            <button className="btn" onClick={() => handleCancel(app._id)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentsPage;
