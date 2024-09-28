import React, { useState } from "react";
import "./Sidebar.css"; // Custom CSS for styling
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
const Sidebar = () => {
  const info = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(true); // Trạng thái đăng nhập

  // const handleLogin = () => {
  //   setIsLoggedIn(true); // Cập nhật trạng thái đã đăng nhập
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false); // Cập nhật trạng thái chưa đăng nhập
  // };
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const openOverlay = () => {
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
  };
  const param = useParams();
  const room = chatRooms.find((room) => room.id === param.id);
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
          <button
            onClick={openOverlay}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <i
              class="far fa-plus-square"
              style={{ fontSize: "24px", color: "white" }}
            ></i>
          </button>
        </div>
        {isOverlayOpen && (
          <div className="overlay">
            <div className="overlay-content">
              <div className="overlay-title">
                <h4 style={{ marginTop: "0px" }}>Tạo nhóm</h4>
                <button onClick={closeOverlay}>
                  <i
                    class="far fa-times-circle"
                    style={{ fontSize: "24px" }}
                  ></i>
                </button>
              </div>
              <div
                style={{
                  border: "1px solid #fff", // White border
                  borderRadius: "10px", // Rounded corners
                  padding: "10px", // Optional: Add some padding for better spacing
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // Optional: Add a subtle shadow for depth
                  marginTop: "20px",
                }}
              ></div>
              <div className="nameroom">
                <div class="circle-icon">
                  <i
                    class="fas fa-camera"
                    style={{ fontSize: "24px", color: "#fffff" }}
                  ></i>
                </div>
                <div className="name">
                  <input type="text"></input>
                  <div
                    style={{
                      border: "1px solid #fff", // White border
                      borderRadius: "10px", // Rounded corners
                      padding: "10px", // Optional: Add some padding for better spacing
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // Optional: Add a subtle shadow for depth
                    }}
                    className="line"
                  ></div>
                </div>
              </div>
              <div className="search">
                <i
                  class="fas fa-search"
                  style={{
                    color: "#ccc",
                    paddingRight: "10px",
                    paddingLeft: "7px",
                  }}
                ></i>
                <input type="text" placeholder="Nhập email"></input>
              </div>
              <div
                style={{
                  border: "1px solid #fff", // White border
                  borderRadius: "10px", // Rounded corners
                  padding: "10px", // Optional: Add some padding for better spacing
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // Optional: Add a subtle shadow for depth
                  marginTop: "20px",
                }}
              ></div>
              <div className="list">
                {chatRooms.map((room) => (
                  <div className="group-overlay">
                    <img src="" alt="avatar" className="imagine"></img>
                    <div className="group-item">
                      <div className="info" key={room.id}>
                        {room.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
