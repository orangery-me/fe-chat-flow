import React from "react";
import "./Sidebar.css";
import { useAuth } from "../../hooks/useAuth";

const UnAuthenSidebar = () => {
    const { logout } = useAuth();

    return (
        <div className="sidebar">
            <div className="sidebar-item profile">
                <img src="/Logo.png" alt="Logo" className="logo" />
            </div>
            <div className="sidebar-item">
                <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <i className="far fa-plus-square" style={{ fontSize: "24px", color: "white" }}></i>
                </button>
            </div>

            <div className="sidebar-item">
                <button onClick={logout} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <i className="fas fa-sign-out-alt" style={{ fontSize: "26px", color: "white" }}></i>
                </button>
            </div>
        </div>
    );
};

export default UnAuthenSidebar;
