import { useMessages } from "../../hooks/useMessages";
import { useAuth } from "../../hooks/useAuth";
import { useLayoutEffect, useRef, useEffect } from "react";
import "./styles.css";
function MessageList({ roomId }) {
  const info = useAuth();
  const containerRef = useRef(null);
  const user = info.user;
  const messages = useMessages(roomId);

  useLayoutEffect(() => {
    console.log("messages: ", messages);
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  return (
    <div className="chat-container" ref={containerRef}>
      {/* /*className="message-list"*/}
      {messages &&
        messages.map((x) => (
          <Message
            key={x.id}
            message={x}
            type={x.sender.uid === user.uid ? "outgoing" : "incoming"}
            //   isOwnMessage={x.sender.uid === user.uid}
          />
        ))}
    </div>
  );
}

function Message({ message, type }) {
  const { sender, text, imageUrl } = message;
  return (
    <div className={["message", type].join(" ")}>
      <div className={["sender", type].join(" ")}>
        {type === "outgoing" ? "You" : sender.displayName}
      </div>
      <div className="message-content">
        {text && <div className="text">{text}</div>}{" "}
        {/* Display text separately */}
        {imageUrl && (
          <div className="image-container">
            {" "}
            {/* Container for images */}
            <img
              src={imageUrl}
              alt="Uploaded"
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                marginTop: "10px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageList;
