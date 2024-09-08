import { useMessages } from "../../hooks/useMessages";
import { useAuth } from "../../hooks/useAuth";
import { useLayoutEffect, useRef, useEffect } from "react";
import './styles.css';

function MessageList ({roomId}) {
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
        <div className="message-list-container" ref={containerRef}>
            <ul className="message-list">
                {messages && messages.map((x) => (
                    <Message
                        key={x.id}
                        message={x}
                        isOwnMessage={x.sender.uid === user.uid}
                    />
                ))}
            </ul>
        </div>
    );
}

function Message({ message, isOwnMessage }) {
    const { sender, text } = message;
    return (
        <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
            <h4 className="sender">{isOwnMessage ? 'You' : sender.displayName}</h4>
            <div>{text}</div>
        </li>
    );
}

export default MessageList;