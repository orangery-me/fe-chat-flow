import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import "./styles.css";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

function MessageInput({ roomId }) {

  // const info = useAuth();
  // const [typing, setTyping] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { stompClient } = useStompClient();
  const { user, loading, logout } = useAuth();
  var [typing, setTyping] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // Redirect to the login page (or any other page)
    }
  });

  function sendMessage(e) {
    e.preventDefault();

    if (stompClient && stompClient.connected && typing) {
      const chatMessage = {
        chatRoomId: roomId,
        senderId: user.uid,
        content: typing,
        timestamp: new Date(),
      };
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify(chatMessage),
      });
    }
  }
  const handleChange = (event) => {
    setTyping(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const sender = {
      uid: user.uid,
      displayName: user.displayName,
    };

    // Chỉ cho phép gửi khi có văn bản hoặc hình ảnh (không bắt buộc cả hai)
    if (!typing.trim() && !image) {
      alert("Please enter a message or select an image before sending.");
      return;
    }

    // Gửi tin nhắn văn bản hoặc hình ảnh (hoặc cả hai)
    sendMessage(roomId, sender, typing || "", image);

    // Reset trạng thái sau khi gửi
    setTyping("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
    }
  };

  const handleCameraClick = () => {
    document.getElementById("fileInput").click(); // Mở hộp thoại chọn file
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, event) => {
    if (emojiObject && emojiObject.emoji) {
      setTyping((prevTyping) => prevTyping + emojiObject.emoji);
    } else {
      console.error("Emoji object is undefined:", emojiObject);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="group-chat">
        {imagePreview && (
          <div
            className="image-preview-container"
            style={{ position: "relative", marginTop: "10px" }}
          >
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setImagePreview(null); // Xóa ảnh xem trước
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(255, 255, 255, 0.8)",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                padding: "5px",
                color: "red",
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        <div className="textZone" style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Message"
            value={typing}
            onChange={handleChange}
          />
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div className="button-container">
              <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                {showEmojiPicker && (
                  <Picker
                    onEmojiClick={handleEmojiClick}
                    style={{
                      marginTop: "-350px", // Pulls the element up by 350 pixels
                      height: "350px", // Sets the height of the element
                      width: "300px", // Sets the width of the element
                      backgroundColor: "#fff", // Optional: Set a background color for visibility
                      borderRadius: "10px", // Optional: Rounded corners
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // Optional: Add a subtle shadow for depth
                    }}
                  />
                )}
              </div>
            </div>
            <i
              className="fas fa-camera"
              style={{ fontSize: "26px", cursor: "pointer" }}
              onClick={handleCameraClick}
            ></i>
            <i className="fas fa-microphone" style={{ fontSize: "26px" }}></i>
          </div>
          <button
            type="submit"
            disabled={!typing.trim() && !image}
            style={{
              background: "none",
              border: "none",
              cursor: typing.length > 0 || image ? "pointer" : "not-allowed",
            }}
          >
            <i className="fas fa-paper-plane" style={{ fontSize: "26px" }}></i>
          </button>
        </div>
      </div>
    </form>
  );
}

export default MessageInput;
