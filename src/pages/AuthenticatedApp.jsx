import React from "react";
import { Link } from "react-router-dom";
import { chatRooms } from "../data/chatRooms";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/components/Sidebar";
import ImageSlider from "../components/components/ImageSlider";
import "./AuthenticatedApp.css";
function AuthenticatedApp() {
  const info = useAuth();

  return (
    <div className="home">
      <Sidebar />
      <div className="profile-form">
        <h2>Chat</h2>
        <input type="text" placeholder="Tìm kiếm"></input>
        <div className="chat">
          {chatRooms.map((room) => (
            <div className="group">
              <img src="" alt="avatar" className="imagine"></img>
              <div className="group-item">
                <div className="info" key={room.id}>
                  <Link to={`/room/${room.id}`}>{room.title}</Link>
                  {/* <div>{room.title}</div> */}
                </div>
                {/* <p className='message'>{items.Message}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <h2>Welcome { info.user.displayName}</h2>
            <button onClick={info.logout} >
                Logout
            </button> */}
      {/* <h2>Choose a Chat Room</h2> */}
      {/* <ul className="chat-room-list">
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                ))}
            </ul> */}
      <div
        style={{
          border: "1px solid #ccc", // Đường viền màu xám, dày 2px
          borderRadius: "10px",
        }}
      ></div>
      <ImageSlider />
    </div>
  );
}

export default AuthenticatedApp;
