import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStompClient } from "../../context/StompClientContext"
import MessageInput from "../MessageInput";
import MessageList from "../MessageList";
import { useAuth } from "../../hooks/useAuth";
import "./styles.css";
import Sidebar from "../components/Sidebar";
import Form from "../components/Form";
import { useMessages } from "../../hooks/useMessages";

function ChatRoom () {
  const { stompClient } = useStompClient();
  const { user, loading, logout } = useAuth();
  const roomId = useParams()["roomId"];
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  });


  if (!stompClient) {
    return <div>Connecting...</div>;
  } else {
    return (
      <div className="home">
        <Sidebar />
        <Form />
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
          {user && <MessageList roomId={roomId} userId={user.uid}></MessageList>}
          <MessageInput roomId={roomId} ></MessageInput>
        </div>
      </div>
    );
  }
}

export default ChatRoom;