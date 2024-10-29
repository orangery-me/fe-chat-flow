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

function MessageInput({ roomId }) {
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
      navigate("/"); // Redirect to the login page (or any other page)
    }
  }, [loading, user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
    sendMessage(e.target); // Truyền đối tượng form
  };
    const sendMessage = async (data) => {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("chatRoomId", roomId);
      formData.append("SenderId", user.uid);
      formData.append("content", typing);
    const res = await fetch("http://localhost:8080/sendMessageToRoom", {
      method: "POST",
      headers: {
            "Content-Type": "application/json",
          },
      body: JSON.stringify(chatMessage),
    }).then((res) => res.json());
    // // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    //   e.preventDefault();

    //   const chatMessage = {
    //               chatRoomId: roomId,
    //               senderId: user.uid,
    //               content: typing,
    //               file: "",
    //           };

    //   console.log("Request Body:", JSON.stringify(requestBody));

    //   try {
    //     const response = await fetch("http://localhost:8080/sendMessageToRoom", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(chatMessage),
    //     });

    //     const textResponse = await response.text();
    //     console.log("Raw Response:", textResponse);

    //     // Check if the response is JSON by verifying the Content-Type header
    //     if (response.headers.get("content-type")?.includes("application/json")) {
    //       const data = JSON.parse(textResponse);

    //       if (response.ok) {
    //         alert("Room created successfully: " + JSON.stringify(data));
    //       } else {
    //         console.error("Failed to create room:", data);
    //         alert("Failed to create room: " + JSON.stringify(data));
    //       }
    //     } else {
    //       // If not JSON, assume it's a success message or ID and display it directly
    //       if (response.ok) {
    //         alert("Room created successfully. Response: " + textResponse);
    //       } else {
    //         alert("Failed to create room: " + textResponse);
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error creating room:", error);
    //     if (error instanceof TypeError) {
    //       alert("Network error: " + error.message);
    //     } else {
    //       alert("Error creating room: " + error.message);
    //     }
    //   }
    };
//   function sendMessage() {
//     if (stompClient && stompClient.connected) {
//         const chatMessage = {
//             chatRoomId: roomId,
//             senderId: user.uid,
//             content: typing,
//             file: "",
//         };
//
//         console.log("Sending message:", chatMessage);
//
//         stompClient.publish({
//             destination: "/app/chat",
//             body: JSON.stringify(chatMessage),
//         });
//
//         setMessages((prevMessages) => [
//             ...prevMessages,
//             chatMessage,
//         ]);
//
//         setTyping("");
//         setImage(null);
//         setImagePreview(null);
//     } else {
//         console.error("STOMP client is not connected or typing is empty.");
//     }
// }



  

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
    document.getElementById("fileInput").click(); // Mở hộp thoại chọn file
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
    <form onSubmit={onSubmit}>
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
            type="file" {...register("file")}
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
