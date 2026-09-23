import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const AppLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <aside>
        <h1>NEXUS</h1>

        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/tasks">Tasks</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/activity">Activity</NavLink>
        </nav>

        <div>
          <p>{user?.username}</p>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;