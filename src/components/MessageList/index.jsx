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

// function Message({ message, isOwnMessage }) {
//   const { sender, text } = message;
//   return (
//     <li className={["message", isOwnMessage && "own-message"].join(" ")}>
//       <h4 className="sender">{isOwnMessage ? "You" : sender.displayName}</h4>
//       <div>{text}</div>
//     </li>
//   );
// }
function Message({ message, type }) {
  const { sender, text } = message;
  return (
    <div className={["message", type].join(" ")}>
      <div className={["sender", type].join(" ")}>
        {type === "outgoing" ? "You" : sender.displayName}
      </div>
      <div className="message-content">{text}</div>
    </div>
  );
}
export default MessageList;
