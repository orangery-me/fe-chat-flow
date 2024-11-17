import React from "react";
import "./Sidebar.css";
import { useAuth } from "../../hooks/useAuth";

const UnAuthenSidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <img src="/image.png" alt="Logo" className="logo" style={
          {
            borderRadius: "50%",
            border: "1px solid #ccc",
          }
        } />
        <p className="logoText">BKConnect</p>
      </div>
      <div style={{ border: "1px solid #ccc" }}></div>
    </div>
  );
};

export default UnAuthenSidebar;
