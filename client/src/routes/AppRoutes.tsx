import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import AppLayout from "../layouts/AppLayout.tsx";
import Projects from "../pages/Projects.tsx";
import Tasks from "../pages/Tasks.tsx";
import Notes from "../pages/Notes.tsx";
import Activity from "../pages/Activity.tsx";
import ProjectDetails from "../pages/ProjectDetails.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetails />}
          />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/activity" element={<Activity />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;