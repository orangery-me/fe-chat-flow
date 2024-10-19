import React,{ useEffect, useState }  from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStompClient } from "../../Context/StompClientContext";
import MessageInput from "../MessageInput";
import MessageList from "../MessageList";
import { useAuth } from "../../hooks/useAuth";
import {JoinedRooms} from "../JoinedRooms/joined-rooms";
import "./styles.css";
import Sidebar from "../components/Sidebar";
function ChatRoom() {
  // const param = useParams();
  // const room = chatRooms.find((room) => room.id === param.id);
  const { stompClient } = useStompClient();
  const { user, loading, logout } = useAuth();
  const roomId = useParams()["roomId"];
  var [typing, setTyping] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // Redirect to the login page (or any other page)
    }
  });


  if (!stompClient) {
    return <div>Connecting...</div>;
  } else {
  return (
    <div className="home">
      <Sidebar />
      <div className="profile-form">
        <h2>Chat</h2>
        <input type="text" placeholder="Tìm kiếm"></input>
        <div className="chat">
          <JoinedRooms userId={user.id}></JoinedRooms>
        </div>
      </div>
      <div className="connecting" hidden={stompClient.connected}>
              Connecting...
            </div>
      <div className="welcome-text">
        <div className="group-title">
          <img src="" alt="avatar" className="imagine"></img>
          <div className="group-items">
            <h3 className="name"> {roomId.roomName}</h3>
            <div className="icons">
              <img src="/phone.png" alt=""></img>
              <img src="/face.png" alt=" "></img>
              <img src="/detail.png" alt=""></img>
            </div>
          </div>
        </div>
        <div
          style={{
            border: "1px solid #fff", // White border
            borderRadius: "10px", // Rounded corners
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", // Optional: Add a subtle shadow for depth
          }}
        ></div>
        <MessageList roomId={roomId} userId = {user.uid}></MessageList>
        <MessageInput roomId={roomId} ></MessageInput>
      </div>
    </div>
  );
}
}

export default ChatRoom;
