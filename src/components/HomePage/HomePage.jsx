import React from "react";
import Sidebar from "../components/Sidebar";
import ImageSlider from "../components/ImageSlider";
import "./HomePage.css";
// import SignIn from "./SignIn";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const HomePage = () => {
  return (
    <div className="home">
      <Sidebar />
      <SignIn />
      <div
        style={{
          border: "1px solid #ccc", // Đường viền màu xám, dày 2px
          borderRadius: "10px",
        }}
      ></div>
      <ImageSlider />
    </div>
  );
};

const SignIn = () => {
  const { login } = useContext(AuthContext);
  return (
    <div className="profile-form">
      <h2>Đăng nhập</h2>
      <img
        src="https://www.cybindose.com/wp-content/uploads/2020/03/login-graphic.png"
        alt=""
      ></img>
      <button className="google-btn" onClick={login}>
        <img
          src="icons8-google-20.png"
          alt="Google icon"
          className="google-icon"
        />
        Đăng nhập với Google
      </button>
    </div>
  );
};
export default HomePage;
