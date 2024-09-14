import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import MessageInput from "../MessageInput";
import MessageList from "../MessageList";
import "./styles.css";
import Sidebar from "../components/Sidebar";
function ChatRoom() {
  const param = useParams();
  const room = chatRooms.find((room) => room.id === param.id);

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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          border: "1px solid #ccc", // Đường viền màu xám, dày 2px
          borderRadius: "10px",
        }}
      ></div>
      <div className="welcome-text">
        <div className="group-title">
          <img src="" alt="avatar" className="imagine"></img>
          <div className="group-items">
            <h3 className="name"> {room.title}</h3>
            {/* <div>
              <Link to="/">// Back to Home // </Link>
            </div> */}
            <div className="icons">
              <img src="/phone.png" alt=""></img>
              <img src="/face.png" alt=" "></img>
              <img src="/detail.png" alt=""></img>
            </div>
          </div>
        </div>
        <div
          style={{
            border: "1px solid #fff", // Đường viền màu xám, dày 2px
            borderRadius: "10px",
          }}
        ></div>
        {/* <div className="chat-container"> */}
        <MessageList roomId={room.id}></MessageList>
        {/* </div> */}
        <div
          style={{
            border: "1px solid #fff", // Đường viền màu xám, dày 2px
            borderRadius: "10px",
          }}
        ></div>
        <MessageInput roomId={room.id}></MessageInput>
      </div>
    </div>
  );
}

export default ChatRoom;
