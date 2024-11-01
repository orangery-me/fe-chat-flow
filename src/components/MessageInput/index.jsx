import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useStompClient } from "../../context/StompClientContext";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";
import React from "react";
import { useForm } from "react-hook-form";

function MessageInput({ roomId, addMessage }) {
  const [messages, setMessages] = useState([]); 
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { stompClient } = useStompClient();
  const { user, loading, logout } = useAuth();
  var [typing, setTyping] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); 
    }
  }, [loading, user, navigate]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("chatRoomId", roomId); 
    formData.append("senderId", user.uid); 
    formData.append("content", typing); 
    if (image) {
        formData.append("file", image); 
    }

    const res = await fetch("http://localhost:8080/sendMessageToRoom", {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        const savedMessage = await res.json(); 

        setMessages((prevMessages) => [...prevMessages, savedMessage]);
        addMessage(savedMessage);
        console.log(savedMessage); 
    } else {
        console.error("Error sending message:", res.statusText);
    }
    setTyping("");
    setImage(null);
    setImagePreview(null);
};

  const handleChange = (event) => {
    setTyping(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleCameraClick = () => {
    document.getElementById("fileInput").click(); 
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, event) => {
    if (emojiObject && emojiObject.emoji) {
      setTyping((prevTyping) => prevTyping + emojiObject.emoji);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            accept="image/*"
            {...register("file")}
            style={{ display: "none" }}
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
                      marginTop: "-350px", 
                      height: "350px",
                      width: "300px",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
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