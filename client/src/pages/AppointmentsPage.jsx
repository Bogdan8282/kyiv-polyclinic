import { useState, useEffect } from "react";
import api from "../services/api";

function AppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetchDoctors();
    fetchSchedules();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err.response?.data?.message);
    }
  };

  const fetchSchedules = async () => {
    try {
      const res = await api.get("/schedules");
      setSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedules:", err.response?.data?.message);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(
        "Error fetching appointments:",
        err.response?.data?.message
      );
    }
  };

  const getAvailableTimes = () => {
    if (!doctorId || !date) return [];

    const selectedDate = new Date(date);
    const selectedDay = selectedDate.getDay(); // 0 - Sunday, 1 - Monday, ..., 6 - Saturday
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const selectedDayName = dayNames[selectedDay];

    console.log("Schedules:", schedules);
    console.log("Selected doctor:", doctorId);
    console.log(
      "Selected date:",
      date,
      "Selected day:",
      selectedDay,
      "Selected day name:",
      selectedDayName
    );

    const doctorSchedules = schedules.filter(
      (s) =>
        (s.doctor === doctorId ||
          (s.doctor._id && s.doctor._id === doctorId)) &&
        s.dayOfWeek === selectedDayName
    );

    if (doctorSchedules.length === 0) {
      return [];
    }

    const availableTimes = [];

    doctorSchedules.forEach((schedule) => {
      let start = toMinutes(schedule.startTime);
      const end = toMinutes(schedule.endTime);

      while (start < end) {
        const slot = toTime(start);
        const isTaken = appointments.some(
          (app) =>
            app.doctor._id === doctorId &&
            app.date === date &&
            app.time === slot
        );
        if (!isTaken) {
          availableTimes.push(slot);
        }
        start += 30;
      }
    });

    return availableTimes;
  };

  const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const toTime = (minutes) => {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const m = (minutes % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const handleBook = async () => {
    if (!doctorId || !date || !time) return;
    try {
      await api.post("/appointments", { doctor: doctorId, date, time });
      setDoctorId("");
      setDate("");
      setTime("");
      fetchAppointments();
    } catch (error) {
      alert(error.response?.data?.message || "Error booking appointment");
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      alert(error.response?.data?.message || "Error cancelling appointment");
    }
  };

  return (
    <div className="wrapper">
      <div className="flex flex-col gap-4 mb-8">
        <h2>Записатись до лікаря</h2>
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
          <option value="">Вибрати лікаря</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">Вибрати час</option>
          {getAvailableTimes().map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button onClick={handleBook} className="btn">
          Записатись
        </button>

        {doctorId && date && getAvailableTimes().length === 0 && (
          <p style={{ color: "red" }}>
            У доктора немає вільного часу на вибрану дату. Будь ласка, оберіть
            іншу дату.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h2>Мої записи</h2>
        <ul className="flex flex-col gap-4">
          {appointments.map((app) => (
            <li className="flex flex-col gap-2" key={app._id}>
              <span>{app.doctor?.name}</span>
              <span>
                {app.date} - {app.time}
              </span>
              <button className="btn" onClick={() => handleCancel(app._id)}>Відмінити</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AppointmentsPage;
