import React, { useEffect, useState, useRef } from "react";
import { useRooms } from "../../hooks/useRooms";
import { useNotifications } from "../../hooks/useNotifications";
import { Link } from "react-router-dom";
import "./style.css";
import { API } from "../../ipConfig.js";
function JoinedRooms({ userId }) {
  const containerRef = useRef(null);
  const { joinedRooms } = useRooms(userId);
  const [displayNames, setDisplayNames] = useState({});
  const [avatar, setAvatar] = useState({});
  const noti = useNotifications(userId);

  useEffect(() => {
    const fetchDisplayNames = async () => {
      const names = {};
      const avatars = {};
      await Promise.all(
        joinedRooms.map(async (room) => {
          const { roomName, user1Id, user2Id, avatar } = room;

          if (roomName) {
            names[room.id] = roomName;
            avatars[room.id] = avatar;
          }
          var url = "";
          if (user1Id && user2Id) {
            try {
              if (user2Id === userId) {
                url = `${API}findById?Id=${user1Id}`;
              } else url = `${API}findById?Id=${user2Id}`;
              const response = await fetch(url);
              const data = await response.json();

              names[room.id] = data.fullname;
              avatars[room.id] = data.photoURL;
            } catch (error) {
              names[room.id] = "Error loading name";
            }
          }
        })
      );
      setDisplayNames(names);
      setAvatar(avatars);
    };

    fetchDisplayNames();
  }, [joinedRooms]);

  // useEffect(() => {
  //     const fetchLastMessages = async () => {
  //         const messages = {};
  //         await Promise.all(
  //             joinedRooms.map(async (room) => {
  //                 try {
  //                     console.log(room.id);
  //                     const response = await fetch(
  //                         `${API}getChatLastMessage/${room.id}`
  //                     );
  //                     const data = await response.json();
  //                     console.log(data);
  //                     messages[room.id] = data.message || "No messages yet";
  //                 } catch (error) {
  //                     messages[room.id] = "Error loading message";
  //                 }
  //             })
  //         );
  //         setLastMessages(messages);
  //     };

  //     fetchLastMessages();
  // }, [joinedRooms]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [joinedRooms]);

  return (
    <div ref={containerRef}>
      {joinedRooms.map((room) => (
        <div className="group" key={room.id}>
          <img src={avatar[room.id]} alt="avatar" className="imagine" />
          <div className="group-item">
            <div className="info">
              <Link to={`/chat/${room.id}`} className="link">
                {displayNames[room.id] || "Loading..."}
              </Link>
            </div>
            {/* <div className="last-message">
                            {lastMessages[room.id] || "Loading..."}
                        </div> */}
          </div>
          <div className="notification">
            {noti.filter((n) => n.chatRoomId === room.id).length > 0 && (
              <span className="notification-badge">
                {noti.filter((n) => n.chatRoomId === room.id).length}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export { JoinedRooms };
