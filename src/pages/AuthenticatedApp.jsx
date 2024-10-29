import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ImageSlider from "../components/components/ImageSlider";
import Sidebar from "../components/components/Sidebar";
import { JoinedRooms } from "../components/JoinedRooms/joined-rooms";
import { useStompClient } from "../context/StompClientContext";

import "./AuthenticatedApp.css";

function AuthenticatedApp() {
  const { user, logout } = useAuth();
  const [currentMemberEmail, setCurrentMemberEmail] = useState("");
  const [membersId, setMembersId] = useState([]);
  const [membersEmail, setMemberEmail] = useState([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const { stompClient } = useStompClient();

  const handleAddMemberByEmail = async () => {
    try {
      const response = await fetch(`http://localhost:8080/findByEmail?email=${currentMemberEmail}`);
      const data = await response.json();
      if (response.ok && data.length > 0) {
        const memberId = data[0].uid;
        const memberEmail = data[0].email;
        if (!membersEmail.includes(memberEmail)) {
          setMemberEmail([...membersEmail, memberEmail]);
        }
        if (!membersId.includes(memberId)) {
          setMembersId([...membersId, memberId]);
        }
        setFoundUser(data[0]); 
        setOverlayVisible(true); 
      } else {
        alert("User not found.");
      }
    } catch (error) {
      console.error("Error finding user by email:", error);
      alert("Error finding user by email: " + error.message);
    }
  };

  function handleMessage() {
    if (stompClient && stompClient.connected) {
        const chatMessage = {
            chatRoomId: roomId,
            senderId: user.uid,
            content: typing,
            receiverId: foundUser.uid,
        };

        console.log("Sending message:", chatMessage); 

        stompClient.publish({
            destination: "/app/chatToUser",
            body: JSON.stringify(chatMessage),
        });

        setMessages((prevMessages) => [
            ...prevMessages,
            chatMessage,
        ]);

        setTyping("");
        setImage(null);
        setImagePreview(null);
    } else {
        console.error("STOMP client is not connected or typing is empty.");
    }
}

  const closeOverlay = () => {
    setOverlayVisible(false);
    setFoundUser(null);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="profile-form">
        <h2>Chat</h2>
        <div className="search">
          <input
            type="text"
            value={currentMemberEmail}
            onChange={(e) => setCurrentMemberEmail(e.target.value)}
            placeholder="Nhập email"
            className="styled-input"
          />
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={handleAddMemberByEmail}
          >
            Tìm kiếm
          </button>
        </div>
        <div className="chat">
          <JoinedRooms userId={user.uid} />
        </div>
      </div>
      <ImageSlider />

      {overlayVisible && foundUser && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Thông tin người dùng</h3>
            <p>Email: {foundUser.email}</p>
            <p>ID: {foundUser.fullname}</p>
            <div className="search">
          <input
            type="text"
            // value={}
            // onChange={(e) => setCurrentMemberEmail(e.target.value)}
            placeholder="Nhập tin nhắn"
            className="styled-input"
          />
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={handleMessage}
          >
            Gửi
          </button>
        </div>
            <button onClick={closeOverlay}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export { AuthenticatedApp };
