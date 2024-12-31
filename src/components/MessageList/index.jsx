import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useMessages } from "../../hooks/useMessages";
import { API } from "../../ipConfig";
import { useNavigate } from "react-router-dom";
import Noti from "../Noti/Noti";
import "./styles.css";


function MessageList ({ roomId, userId }) {
  const messages = useMessages(roomId);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [linkToNavigate, setLinkToNavigate] = useState("");
  const [notification, setNotification] = useState("");


  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);


  const handleLinkClick = (link) => {
    setLinkToNavigate(link);
    setShowConfirmation(true);
  };


  const confirmNavigation = async () => {
    setShowConfirmation(false);
    const parts = linkToNavigate.split("/chat/");
    const room = parts[1];

    const url = `${API}addMemberChatRoom/${room}?userId=${userId}`;
    const finalResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'ngrok-skip-browser-warning': 'true'
      },
    });
    console.log("Request URL:", url);

    if (finalResponse.ok) {
      setNotification("Member added successfully ");
      navigate(`/chat/${room}`);
    } else {
      setNotification("Có lỗi xảy ra khi thêm thành viên vào nhóm.");
    }

  };


  function Message ({ message, type }) {
    const { sender, content, imageUrl } = message;
    const [displayedSender, setDisplayedSender] = useState(sender);


    useEffect(() => {
      if (sender) {
        setDisplayedSender(sender);
      }
    }, [sender]);


    let messageType = type;
    if (content?.endsWith(" đã rời nhóm") || content?.endsWith(" đã được thêm vào nhóm")) {
      messageType = "noti";
    }


    const renderContent = (content) => {
      return content.split(" ").map((part, index) => {
        if (part.startsWith("http")) {
          return (
            <a
              key={index}
              href={part}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(part);
              }}
              style={{ color: "white", textDecoration: "underline" }}
            >
              {part}
            </a>
          );
        }
        return <span key={index}>{part} </span>;
      });
    };
    console.log(messageType);


    return (
      <div className={`message ${messageType}`}>
        {messageType !== "noti" && (
          <div className={`sender ${messageType}`}>
            {messageType === "outgoing"
              ? "You"
              : displayedSender?.fullname || "Loading sender..."}
          </div>
        )}
        <div className="message-content">
          {content && <div className="text">{renderContent(content)}</div>}
          {imageUrl && <ImageComponent imageUrl={imageUrl} />}
        </div>
      </div>
    );
  }


  const ImageComponent = ({ imageUrl }) => {
    const [isShowImg, setShowImg] = useState(false);


    return (
      <div className="image-container">
        <button
          onClick={() => setShowImg(true)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img
            className="custom-img"
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "10px" }}
          />
        </button>
        {isShowImg && (
          <div className="showimg">
            <div className="showimg-content" style={{ position: "relative" }}>
              <button
                onClick={() => setShowImg(false)}
                style={{ position: "absolute", top: "1px", background: "transparent", cursor: "pointer" }}
              >
                <i className="far fa-times-circle" style={{ fontSize: "24px" }}></i>
              </button>
              <div
                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", width: "100%" }}
              >
                <img
                  src={imageUrl}
                  alt="Image"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


  return (
    <div className="chat-container" ref={containerRef}>
      <Noti message={notification} />
      {messages &&
        messages.map((x) => (
          <Message
            key={x.id}
            message={x}
            type={x.sender.uid === userId ? "outgoing" : "incoming"}
          />
        ))}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Bạn có muốn tham gia nhóm này không?</p>
          <button onClick={confirmNavigation}>Có</button>
          <button onClick={() => setShowConfirmation(false)}>Không</button>
        </div>
      )}
    </div>
  );
}


export default MessageList;
