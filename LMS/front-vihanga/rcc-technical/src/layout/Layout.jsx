import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}