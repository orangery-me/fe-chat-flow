import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../../hooks/useAuth";
import { sendMessage } from "../../services/firebase";
import { useState } from "react";
import "./styles.css";
function MessageInput({ roomId }) {
  const info = useAuth();
  const [typing, setTyping] = useState("");

  const handleChange = (event) => {
    setTyping(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sender = {
      uid: info.user.uid,
      displayName: info.user.displayName,
    };
    sendMessage(roomId, sender, typing);
    setTyping("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="group-chat">
        <div className="textZone">
          <input
            type="text"
            placeholder="Message"
            value={typing}
            onChange={handleChange}
            required
            minLength={1}
          ></input>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <i className="far fa-smile" style={{ fontSize: "26px" }}></i>
            <i className="fas fa-camera" style={{ fontSize: "26px" }}></i>
            <i className="fas fa-microphone" style={{ fontSize: "26px" }}></i>
            <button
              type="submit"
              disabled={typing.length < 1} // kiểm tra nếu người dùng đã nhập
              style={{
                background: "none",
                border: "none",
                cursor: typing.length > 0 ? "pointer" : "not-allowed", // thay đổi con trỏ dựa trên trạng thái disabled
              }}
            >
              <i
                className="fas fa-paper-plane"
                style={{ fontSize: "26px" }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MessageInput;
