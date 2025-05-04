import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AppointmentsPage from "./pages/AppointmentsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import AdminPanel from "./pages/AdminPanel";
import ManageAppoinments from "./pages/ManageAppoinments";
import SpecializationsPage from "./pages/ManageSpecializations";
import DoctorsPage from "./pages/ManageDoctors";
import SchedulesPage from "./pages/ManageSchedules";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appoinments"
          element={
            <ProtectedRoute requiredRole="admin">
              <ManageAppoinments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/specializations"
          element={
            <ProtectedRoute requiredRole="admin">
              <SpecializationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute requiredRole="admin">
              <DoctorsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/schedules"
          element={
            <ProtectedRoute requiredRole="admin">
              <SchedulesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
