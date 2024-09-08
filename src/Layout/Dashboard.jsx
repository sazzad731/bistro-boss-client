import { Outlet } from "react-router-dom";
import DashboardSideBar from "../Componets/DashboardSideBar/DashboardSideBar";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Dashboard side bar */}
      <DashboardSideBar />
      {/* Dashboard content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;