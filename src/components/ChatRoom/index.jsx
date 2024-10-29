import React,{ useEffect, useState }  from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStompClient } from "../../context/StompClientContext"
import MessageInput from "../MessageInput";
import MessageList from "../MessageList";
import { useAuth } from "../../hooks/useAuth";
import {JoinedRooms} from "../JoinedRooms/joined-rooms";
import "./styles.css";
import Sidebar from "../components/Sidebar";
function ChatRoom() {
  const { stompClient } = useStompClient();
  const { user, loading, logout } = useAuth();
  const [membersId, setMembersId] = useState([]);
  const [membersEmail, setMemberEmail] = useState([]);
  const [currentMemberEmail, setCurrentMemberEmail] = useState("");

  const roomId = useParams()["roomId"];
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // Redirect to the login page (or any other page)
    }
  });
  const handleAddMemberByEmail = async () => {
    try {
      const response = await fetch(`http://localhost:8080/findByEmail?email=${currentMemberEmail}`);
      const data = await response.json();
      if (response.ok && data.length > 0) {
        const memberId = data[0].uid; // Assuming that you want to use the ID from the response
        const memberEmail = data[0].email;
        if (!membersEmail.includes(memberEmail)) {
          setMemberEmail([...membersEmail, memberEmail]);}
        if (!membersId.includes(memberId)) {
          setMembersId([...membersId, memberId]); // Store ID instead of email
        } 
      } else {
        alert("User not found.");
      }
      
    } catch (error) {
      console.error("Error finding user by email:", error);
      alert("Error finding user by email: " + error.message);
    }
  };
  if (!stompClient) {
    return <div>Connecting...</div>;
  } else {
  return (
    <div className="home">
      <Sidebar />
      <div className="profile-form">
        <h2>Chat</h2>
        <div className="search">
              <input
                type="text"
                value={currentMemberEmail}
                onChange={(e) =>setCurrentMemberEmail(e.target.value)}
                placeholder="Nhập email"
                className="styled-input"
              />
              <button style={{
      backgroundColor: "#4CAF50", 
      color: "white", 
      padding: "10px 20px", 
      fontSize: "16px", 
      cursor: "pointer", 
      border: "none", 
      borderRadius: "5px", 
    }} onClick={handleAddMemberByEmail}>Thêm</button>
            </div>
        <div className="chat">
        {!loading && <JoinedRooms userId={user.uid}></JoinedRooms>}
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
