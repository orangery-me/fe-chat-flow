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

      <ImageSlider />
    </div>
  );
}

export default AuthenticatedApp;
