import DashboardHeader from "../components/dashboard/DashboardHeader.tsx";
import DashboardStats from "../components/dashboard/DashboardStats.tsx";
import RecentProjects from "../components/dashboard/RecentProjects.tsx";
import RecentActivity from "../components/dashboard/RecentActivity.tsx";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <DashboardStats />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentProjects />
        <RecentActivity />
      </section>
    </div>
  );
};

export default Dashboard;