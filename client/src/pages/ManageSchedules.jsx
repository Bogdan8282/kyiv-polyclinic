import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const DAYS_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSchedules();
    fetchDoctors();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await api.get("/schedules");
      setSchedules(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching schedules");
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching doctors");
    }
  };

  const handleAdd = async () => {
    try {
      await api.post("/schedules", {
        doctor: doctorId,
        dayOfWeek,
        startTime,
        endTime,
      });
      setDoctorId("");
      setDayOfWeek("");
      setStartTime("");
      setEndTime("");
      fetchSchedules();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating schedule");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/schedules/${id}`);
      fetchSchedules();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting schedule");
    }
  };

  const sortedSchedules = schedules.sort((a, b) => {
    if (a.doctor?.name < b.doctor?.name) return -1;
    if (a.doctor?.name > b.doctor?.name) return 1;
    return DAYS_ORDER.indexOf(a.dayOfWeek) - DAYS_ORDER.indexOf(b.dayOfWeek);
  });

  return (
    <div className="wrapper flex flex-col gap-4">
      <h2>Графіки</h2>
      <Link to="/admin" className="btn-link">
        Назад
      </Link>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
        <option value="">Вибрати доктора</option>
        {doctors.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </select>
      <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
        <option value="">Вибрати день</option>
        {DAYS_ORDER.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <input
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        placeholder="Start time (09:00)"
      />
      <input
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        placeholder="End time (17:00)"
      />
      <button className="btn" onClick={handleAdd}>
        Додати
      </button>
      <ul className="flex flex-col gap-2">
        {sortedSchedules.map((s) => (
          <li key={s._id}>
            {s.doctor?.name} - {s.dayOfWeek} ({s.startTime} - {s.endTime})
            <button
              className="btn"
              onClick={() => handleDelete(s._id)}
              style={{ marginLeft: "10px" }}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SchedulesPage;
