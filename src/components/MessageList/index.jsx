import { useMessages } from "../../hooks/useMessages";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import "./styles.css";
import { useAuth } from "../../hooks/useAuth";

function MessageList ({ roomId, userId }) {
  const messages = useMessages(roomId);
  const containerRef = React.useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);


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
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', width: '100%' }}>
                <img
                  src={imageUrl}
                  alt="Image"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

            </div>
          </div>
        )}
      </div>
    );
  };


  if (!messages) return null;
  return (
    <div className="chat-container" ref={containerRef}>
      {messages &&
        messages.map((x) => (
          console.log('x: ', x),
          <Message key={x.id}
            message={x}
            type={x.sender?.uid === userId ? "outgoing" : "incoming"}
          />
        ))}
    </div>
  );

  function Message ({ message, type }) {
    const { sender, content, imageUrl } = message;
    const [displayedSender, setDisplayedSender] = useState(sender);

    // Khi sender thay đổi, cập nhật lại state
    useEffect(() => {
      if (sender) {
        setDisplayedSender(sender);
      }
    }, [sender]);

    if (!sender) {
      return (
        <div className={["message", type].join(" ")}>
          <div className={["sender", type].join(" ")}>
            Loading sender...
          </div>
          <div className="message-content">
            {content && <div className="text">{content}</div>}
            {imageUrl && <ImageComponent imageUrl={imageUrl} />}
          </div>
        </div>
      );
    }

    return (
      <div className={["message", type].join(" ")}>
        <div className={["sender", type].join(" ")}>
          {type === "outgoing" ? "You" : displayedSender.fullname || "Loading sender..."}
          {/* {isSenderMissing ? "Loading sender..." : type === "outgoing" ? "You" : sender.fullname} */}
        </div>
        <div className="message-content">
          {content && <div className="text">{content}</div>}
          {imageUrl && <ImageComponent imageUrl={imageUrl} />}
        </div>
      </div>
    );
  }


}

export default MessageList;