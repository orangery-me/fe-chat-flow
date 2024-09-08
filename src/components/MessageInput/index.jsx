import { useAuth } from "../../hooks/useAuth";
import { sendMessage } from "../../services/firebase";
import { useState } from "react";
import './styles.css';

function MessageInput ({ roomId }) {
  const info = useAuth();
  const [typing, setTyping] = useState('');

  const handleChange = (event) => {
    setTyping(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sender = {
      'uid': info.user.uid,
      'displayName': info.user.displayName,
    }
    sendMessage(roomId, sender , typing);
    setTyping('');
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Enter a message"
                value={typing}
                onChange={handleChange}
                className="message-input"
                required
                minLength={1}
            />
            <button type="submit" disabled={typing < 1} className="send-message">
                Send
            </button>
        </form>
  );
}

export default MessageInput;