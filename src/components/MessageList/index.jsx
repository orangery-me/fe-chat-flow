import { useMessages } from "../../hooks/useMessages";
import { useAuth } from "../../hooks/useAuth";
import React, { useLayoutEffect, useRef, useState } from "react";
import "./styles.css";

function MessageList({ roomId }) {
  const info = useAuth();
  const containerRef = useRef(null);
  const user = info.user;
  const messages = useMessages(roomId);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  const ImageComponent = ({ imageUrl }) => {
    const [isShowImg, setShowImg] = useState(false);

    const openShowImg = () => {
      setShowImg(true);
    };

    const closeShowImg = () => {
      setShowImg(false);
    };

    return (
      <div className="image-container">
        <button
          onClick={openShowImg}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img
            className="custom-img"
            src={imageUrl}
            alt="Uploaded"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              marginTop: "10px",
            }}
          />
        </button>
        {isShowImg && (
          <div className="showimg">
            <div className="showimg-content">
              <button onClick={closeShowImg}>
                <i class="far fa-times-circle" style={{ fontSize: "24px" }}></i>
              </button>
              <img src={imageUrl} alt="Full size" />
            </div>
          </div>
        )}
      </div>
    );
  };

  function Message({ message, type }) {
    const { sender, text, imageUrl } = message;
    return (
      <div className={["message", type].join(" ")}>
        <div className={["sender", type].join(" ")}>
          {type === "outgoing" ? "You" : sender.displayName}
        </div>
        <div className="message-content">
          {text && <div className="text">{text}</div>}
          {imageUrl && <ImageComponent imageUrl={imageUrl} />}
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container" ref={containerRef}>
      {messages &&
        messages.map((x) => (
          <Message
            key={x.id}
            message={x}
            type={x.sender.uid === user.uid ? "outgoing" : "incoming"}
          />
        ))}
    </div>
  );
}

export default MessageList;
