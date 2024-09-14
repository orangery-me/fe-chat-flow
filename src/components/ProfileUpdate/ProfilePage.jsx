import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./ProFile.css";
import ImageSlider from "../components/ImageSlider";
const ProfilePage = () => {
  return (
    <div className="home">
      <Sidebar />
      <ProFile />
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

const ProFile = () => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    department: "",
    class: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    // Submit the form data to an API
  };

  return (
    <div className="profile-form">
      <h2>Cập nhật profile</h2>
      <img src="account.png" alt="" className="account"></img>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tên người dùng"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          onChange={handleChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Khoa"
          onChange={handleChange}
        />
        <input
          type="text"
          name="class"
          placeholder="Lớp"
          onChange={handleChange}
        />
        <button type="submit">Cập nhật thông tin</button>
      </form>
    </div>
  );
};
export default ProfilePage;
