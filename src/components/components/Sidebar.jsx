import React, { useState } from "react";
import "./Sidebar.css"; // Custom CSS for styling
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [currentMemberEmail, setCurrentMemberEmail] = useState("");
  const [membersId, setMembersId] = useState([]);
  const [membersEmail, setMemberEmail] = useState([]);
 
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
          // alert(`Added member with ID ${memberId} to the members list.`);
        } else {
          // alert(`Member with ID ${memberId} is already in the members list.`);
        }
      } else {
        alert("User not found.");
      }
      
    } catch (error) {
      console.error("Error finding user by email:", error);
      alert("Error finding user by email: " + error.message);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
  
    if (!roomName) {
      alert("Please provide a room name");
      return;
    }
  
    const requestBody = {
      roomName: roomName,
      roomOwnerId: user.uid,
      otherMembersId: membersId,
    };
  
    console.log("Request Body:", JSON.stringify(requestBody));
  
    try {
      const response = await fetch("http://localhost:8080/createChatRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const textResponse = await response.text();
      console.log("Raw Response:", textResponse);
  
      // Check if the response is JSON by verifying the Content-Type header
      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = JSON.parse(textResponse);
        
        if (response.ok) {
          alert("Room created successfully: " + JSON.stringify(data));
        } else {
          console.error("Failed to create room:", data);
          alert("Failed to create room: " + JSON.stringify(data));
        }
      } else {
        // If not JSON, assume it's a success message or ID and display it directly
        if (response.ok) {
          alert("Room created successfully. Response: " + textResponse);
        } else {
          alert("Failed to create room: " + textResponse);
        }
      }
    } catch (error) {
      console.error("Error creating room:", error);
      if (error instanceof TypeError) {
        alert("Network error: " + error.message);
      } else {
        alert("Error creating room: " + error.message);
      }
    }
  };

  const openOverlay = () => {
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
    setRoomName("");        
  setCurrentMemberEmail(""); 
  setMembersId([]);         
  setMemberEmail([]); 
  };

  return (
    <div className="sidebar">
      <div className="sidebar-item profile">
        <img src="/Logo.png" alt="Logo" className="logo" />
      </div>
      <div className="sidebar-item">
        <button onClick={openOverlay} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <i className="far fa-plus-square" style={{ fontSize: "24px", color: "white" }}></i>
        </button>
      </div>

      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-title">
              <h4>Tạo nhóm</h4>
              <button onClick={closeOverlay}>
                <i className="far fa-times-circle" style={{ fontSize: "24px" }}></i>
              </button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Tên nhóm"
                className="styled-input"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
            <h4 style={{textAlign: "left"}}>Thêm danh sách các thành viên</h4>
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
            <div className="list">
              <ul style={{listStyleType: 'none'}}>
                {membersEmail.map((email, index) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>
            </div>
            <button
    onClick={handleCreateRoom}
    style={{
      backgroundColor: "#4CAF50", 
      color: "white", 
      padding: "10px 20px", 
      fontSize: "16px", 
      cursor: "pointer", 
      border: "none", 
      borderRadius: "5px", 
    }}
  >
    Tạo Phòng
  </button>
          </div>
        </div>
      )}

      <div className="sidebar-item">
        <button onClick={logout} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <i className="fas fa-sign-out-alt" style={{ fontSize: "26px", color: "white" }}></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
