import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SpecializationsPage() {
  const [specializations, setSpecializations] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    try {
      const res = await axios.get("/api/specializations");
      setSpecializations(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error loading specializations");
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("/api/specializations", { name });
      setName("");
      fetchSpecializations();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating specialization");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/specializations/${id}`);
      fetchSpecializations();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting specialization");
    }
  };

  return (
    <div className="wrapper flex flex-col gap-4">
      <h2>Керувати Спеціалізаціями</h2>
      <div className="btn-link">
        <Link to="/admin">Назад</Link>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Specialization name"
      />
      <button className="btn" onClick={handleAdd}>
        Додати
      </button>
      <h4>Спеціалізації</h4>
      <ul className="flex flex-col gap-2">
        {specializations.map((s) => (
          <li key={s._id}>
            {s.name}{" "}
            <button className="btn" onClick={() => handleDelete(s._id)}>
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpecializationsPage;
