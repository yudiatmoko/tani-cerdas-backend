import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto min-h-screen py-8 px-12 bg-primary-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
