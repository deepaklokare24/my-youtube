import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Body = () => {
  const isSidebarOpen = useSelector((store) => store.app.isSidebarOpen);

  return (
    <div className="flex">
      {isSidebarOpen && <Sidebar />}
      <Outlet />
    </div>
  );
};

export default Body;
