import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStompClient } from "../../context/StompClientContext";
import MessageInput from "../MessageInput";
import MessageList from "../MessageList";
import { useAuth } from "../../hooks/useAuth";
import "./styles.css";
import Sidebar from "../components/Sidebar";
import Form from "../components/Form";
import { useMessages } from "../../hooks/useMessages";
import { useRooms } from "../../hooks/useRooms";

function ChatRoom() {
  const { stompClient } = useStompClient();
  const { user, loading, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isframe, setFrame] = useState(false);
  const roomId = useParams()["roomId"];
  const frameRef = useRef(null);
  const buttonRef = useRef(null);
  const [currentMemberEmail, setCurrentEmail] = useState("");
  const [membersId, setMembersId] = useState([]);
  const [membersEmail, setMemberEmail] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [linkToNavigate, setLinkToNavigate] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const navigate = useNavigate();
  const handleAddMemberByEmail = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/findByEmail?email=${currentMemberEmail}`
      );
      const data = await response.json();

      if (response.ok && data.length > 0) {
        const memberId = data[0].uid; // Assuming that you want to use the ID from the response
        const memberEmail = data[0].email;
        if (!membersEmail.includes(memberEmail)) {
          setMemberEmail([...membersEmail, memberEmail]);
        }
        if (!membersId.includes(memberId)) {
          setMembersId([...membersId, memberId]);
        }
      } else {
        alert("User not found.");
      }

      // Check if the user data exists
      if (!data || !data[0]?.uid) {
        console.error("User not found or UID missing.");
        return;
      }

      const requestBody = {
        roomId: roomId,
        newMemberId: data[0].uid,
      };

      const addMemberResponse = await fetch(
        "http://localhost:8080/addNewMember",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const rawResponseText = await addMemberResponse.text();
      console.log("Raw Response:", rawResponseText);

      if (
        addMemberResponse.headers
          .get("content-type")
          ?.includes("application/json")
      ) {
        const jsonResponse = JSON.parse(rawResponseText);

        if (addMemberResponse.ok) {
          alert("Member added successfully:", JSON.stringify(jsonResponse));
        } else {
          alert("Failed to add member:", jsonResponse);
        }
      } else {
        if (addMemberResponse.ok) {
          alert("Member added successfully. Response:", rawResponseText);
        } else {
          alert("Failed to add member. Response:", rawResponseText);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        frameRef.current &&
        !frameRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeFrame();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  });
  const openFrame = () => {
    setFrame(true);
  };
  const closeFrame = () => {
    setFrame(false);
  };

  const handleAddMember = async () => {
    closeFrame();
    setOverlayVisible(true);
    console.log(requestBody);
  };
  const closeOverlay = () => {
    setOverlayVisible(false);
    setCurrentEmail("");
    setMembersId([]);
    setMemberEmail([]);
  };

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setLinkCopied(true);
        console.log("Đã sao chép liên kết: " + link);
        setTimeout(() => setLinkCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Lỗi sao chép liên kết", err);
      });
    closeFrame();
  };
  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
  if (!stompClient) {
    return <div>Connecting...</div>;
  } else {
    return (
      <div className="chatroom">
        <Sidebar />
        <Form />
        <div className="connecting" hidden={stompClient.connected}>
          Connecting...
        </div>
        <div className="content-chat">
          <div className="group-title">
            <img src={user.photoURL} alt="avatar" className="imagine"></img>
            <div className="header-chat">
              <h3 className="name">aaaa</h3>
              <div className="icons">
                <img src="/phone.png" alt=""></img>
                <img src="/face.png" alt=" "></img>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  ref={buttonRef}
                  onClick={openFrame}
                >
                  <img src="/detail.png" alt=""></img>
                </button>
                {isframe && (
                  <div className="Frame" ref={frameRef}>
                    <div className="Frame-item">
                      <div className="item" onClick={handleAddMember}>
                        <b>Thêm thành viên mới</b>
                      </div>
                      <div className="item" onClick={handleCopyLink}>
                        <b>Sao chép liên kết</b>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isOverlayVisible && (
            <div className="overlay-message">
              <div className="overlay-message-content">
                <div className="search">
                  <input
                    type="text"
                    value={currentMemberEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    placeholder="Nhập email"
                    className="input-mail"
                  />
                  <button onClick={handleAddMemberByEmail}>Thêm</button>
                </div>
                <div className="list-mail">
                  <ul style={{ listStyleType: "none" }}>
                    {membersEmail.map((email, index) => (
                      <li key={index} className="email-item">
                        {email}
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={closeOverlay}>Đóng</button>
              </div>
            </div>
          )}
          {linkCopied && (
            <div className="copied-notification">
              Liên kết đã được sao chép!
            </div>
          )}
          <div
            style={{
              border: "1px solid #fff",
              borderRadius: "10px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            }}
          ></div>
          <MessageList roomId={roomId} userId={user.uid}></MessageList>
          <MessageInput roomId={roomId} addMessage={addMessage}></MessageInput>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
