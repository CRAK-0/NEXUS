import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AppLayout from "../layouts/AppLayout.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;