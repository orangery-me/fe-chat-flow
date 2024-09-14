import React, { useState } from "react";
import "./Sidebar.css"; // Custom CSS for styling
import { useAuth } from "../../hooks/useAuth";
const Sidebar = () => {
  const info = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(true); // Trạng thái đăng nhập

  // const handleLogin = () => {
  //   setIsLoggedIn(true); // Cập nhật trạng thái đã đăng nhập
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false); // Cập nhật trạng thái chưa đăng nhập
  // };
  return (
    <div className="sidebar">
      <div className="sidebar-item profile">
        <img src="/Logo.png" alt="Logo" className="logo" />
      </div>
      <>
        <div className="sidebar-item">
          {/* Icon nhóm người */}
          <i className="icon-group"></i>
        </div>
        <div className="sidebar-item">
          {/* Icon tin nhắn */}
          <i className="icon-message"></i>
        </div>
        <div className="sidebar-item">
          {/* Icon lưu trữ */}
          <i className="icon-save"></i>
        </div>
        <div className="sidebar-item">
          {/* Icon thông báo */}
          <i className="icon-bell"></i>
        </div>
        <div className="sidebar-item">
          {/* Icon cài đặt */}
          <i className="icon-settings"></i>
        </div>
        <div className="sidebar-item">
          <button
            onClick={info.logout}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <i
              className="fas fa-sign-out-alt"
              style={{ fontSize: "26px", color: "white" }}
            ></i>
            <span style={{ marginLeft: "8px", color: "white" }}>Logout</span>
          </button>
        </div>
      </>
    </div>
  );
};

export default Sidebar;
/** {isLoggedIn ? (
        <>
          <div className="sidebar-item">
            <i className="icon-group"></i>
          </div>
          <div className="sidebar-item">
            <i className="icon-message"></i>
          </div>
          <div className="sidebar-item">
            <i className="icon-save"></i>
          </div>
          <div className="sidebar-item">
            <i className="icon-bell"></i>
          </div>
          <div className="sidebar-item">
            <i className="icon-settings"></i>
          </div>
          <div className="sidebar-item">
            <button
              onClick={info.logout}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <i
                className="fas fa-sign-out-alt"
                style={{ fontSize: "26px", color: "white" }}
              ></i>
              <span style={{ marginLeft: "8px", color: "white" }}>Logout</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar-item">
            <i
              class="fas fa-home"
              style={{ fontSize: "24px", color: "white" }}
            ></i>
          </div>
          <div className="sidebar-item">
            <i className="icon-bell"></i>
          </div>
          <div className="sidebar-item">
            <i className="icon-settings"></i>
          </div>
        </>
      )} */
