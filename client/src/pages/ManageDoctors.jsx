import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [name, setName] = useState("");
  const [specializationId, setSpecializationId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
    fetchSpecializations();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error loading doctors");
    }
  };

  const fetchSpecializations = async () => {
    try {
      const res = await api.get("/specializations");
      setSpecializations(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error loading specializations");
    }
  };

  const handleAdd = async () => {
    try {
      await api.post("/doctors", {
        name,
        specialization: specializationId,
      });
      setName("");
      setSpecializationId("");
      fetchDoctors();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding doctor");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting doctor");
    }
  };

  return (
    <div className="wrapper flex flex-col gap-4">
      <h2>Доктори</h2>
      <div className="btn-link">
        <Link to="/admin">Назад</Link>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Doctor name"
      />
      <select
        value={specializationId}
        onChange={(e) => setSpecializationId(e.target.value)}
      >
        <option value="">Вибрати спеціалізацію</option>
        {specializations.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>
      <button className="btn" onClick={handleAdd}>Додати</button>
      <ul className="flex flex-col gap-2">
        {doctors.map((d) => (
          <li key={d._id}>
            {d.name} ({d.specialization?.name}){" "}
            <button className="btn" onClick={() => handleDelete(d._id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorsPage;
