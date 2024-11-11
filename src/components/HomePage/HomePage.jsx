import React from "react";
import Sidebar from "../components/Sidebar";
import ImageSlider from "../components/ImageSlider";
import "./HomePage.css";
import { useAuth } from "../../hooks/useAuth";
import UnAuthenSidebar from "../components/UnAuthenSidebar";
const HomePage = () => {


  return (
    <div className="home">
      <UnAuthenSidebar />
      <SignIn />
      <ImageSlider />
    </div>
  );
};

const SignIn = () => {
  const { login, logout } = useAuth();

  const connect = (event) => {
    event.preventDefault();

    login((result, error) => {
      if (error) {
        console.log('Error logging in', error);
      }
    });
  }
  return (
    <div className="profile-form">
      <h2>Đăng nhập</h2>
      <img
        src="https://www.cybindose.com/wp-content/uploads/2020/03/login-graphic.png"
        alt=""
      ></img>
      <button onClick={connect}>
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
