// import React, { useState } from "react";
// import "./Sidebar.css"; // Custom CSS for styling
// import { useAuth } from "../../hooks/useAuth";
// import { useParams } from "react-router-dom";
// import {JoinedRooms} from "../JoinedRooms/joined-rooms";
// const Sidebar = () => {
//   const { user, loading, logout } = useAuth();
//   const [isOverlayOpen, setOverlayOpen] = useState(false);
//   const roomId = useParams()["roomId"];

//   async function createNewRoom(e) {
//     setOverlayOpen(true);
//     e.preventDefault();
//     console.log("createNewRoom");
//     var noti = await fetch("http://localhost:8080/createChatRoom", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         roomName: "roomNek",
//         roomOwnerId: user.uid,
//       }),
//     });
//     console.log(noti);
//   }

//   async function addNewMember(e) {
//     var res = await fetch("http://localhost:8080/addNewMember", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         roomId: roomId,
//         newMemberId: "vEvqQivftfVnEAkbnnrBD4gxmKL2",
//       }),
//     });
//     console.log(res);
//   }


//   const closeOverlay = () => {
//     setOverlayOpen(false);
//   };
//   return (
//     <div className="sidebar">
//       <div className="sidebar-item profile">
//         <img src="/Logo.png" alt="Logo" className="logo" />
//       </div>
//       <>
//         <div className="sidebar-item">
//           {/* Icon nhóm người */}
//           <i className="icon-group"></i>
//         </div>
//         <div className="sidebar-item">
//           {/* Icon tin nhắn */}
//           <i className="icon-message"></i>
//         </div>
//         <div className="sidebar-item">
//           {/* Icon lưu trữ */}
//           <i className="icon-save"></i>
//         </div>
//         <div className="sidebar-item">
//           {/* Icon thông báo */}
//           <i className="icon-bell"></i>
//         </div>
//         <div className="sidebar-item">
//           <button
//             onClick={createNewRoom}
//             style={{ background: "none", border: "none", cursor: "pointer" }}
//           >
//             <i
//               class="far fa-plus-square"
//               style={{ fontSize: "24px", color: "white" }}
//             ></i>
//           </button>
//         </div>
//         {isOverlayOpen && (
//           <div className="overlay">
//             <div className="overlay-content">
//               <div className="overlay-title">
//                 <h4 style={{ marginTop: "0px" }}>Tạo nhóm</h4>
//                 <button onClick={closeOverlay}>
//                   <i
//                     class="far fa-times-circle"
//                     style={{ fontSize: "24px" }}
//                   ></i>
//                 </button>
//               </div>
//               <div
//                 style={{
//                   border: "1px solid #fff", // White border
//                   borderRadius: "10px", // Rounded corners
//                   padding: "10px", // Optional: Add some padding for better spacing
//                   boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // Optional: Add a subtle shadow for depth
//                   marginTop: "20px",
//                 }}
//               ></div>
//               <div className="nameroom">
//                 <div class="circle-icon">
//                   <i
//                     class="fas fa-camera"
//                     style={{ fontSize: "24px", color: "#fffff" }}
//                   ></i>
//                 </div>
//                 <div className="name">
//                   <input type="text"></input>
//                   <div
//                     style={{
//                       border: "1px solid #fff", // White border
//                       borderRadius: "10px", // Rounded corners
//                       padding: "10px", // Optional: Add some padding for better spacing
//                       boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // Optional: Add a subtle shadow for depth
//                     }}
//                     className="line"
//                   ></div>
//                 </div>
//               </div>
//               <div className="search">
//                 <i
//                   class="fas fa-search"
//                   style={{
//                     color: "#ccc",
//                     paddingRight: "10px",
//                     paddingLeft: "7px",
//                   }}
//                 ></i>
//                 <input type="text" placeholder="Nhập email"></input>
//                 <button onClick={addNewMember}>
//                 Thêm
//               </button>
//               </div>
//               <div
//                 style={{
//                   border: "1px solid #fff", // White border
//                   borderRadius: "10px", // Rounded corners
//                   padding: "10px", // Optional: Add some padding for better spacing
//                   boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", // Optional: Add a subtle shadow for depth
//                   marginTop: "20px",
//                 }}
//               ></div>
//               <div className="list">
//                 <JoinedRooms></JoinedRooms>
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="sidebar-item">
//           {/* Icon cài đặt */}
//           <i className="icon-settings"></i>
//         </div>
//         <div className="sidebar-item">
//           <button
//             onClick={logout}
//             style={{ background: "none", border: "none", cursor: "pointer" }}
//           >
//             <i
//               className="fas fa-sign-out-alt"
//               style={{ fontSize: "26px", color: "white" }}
//             ></i>
//             <span style={{ marginLeft: "8px", color: "white" }}>Logout</span>
//           </button>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import "./Sidebar.css"; // Custom CSS for styling
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { JoinedRooms } from "../JoinedRooms/joined-rooms";

const Sidebar = () => {
  const { user, loading, logout } = useAuth();
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const { roomId } = useParams();

  async function createNewRoom(e) {
    
    e.preventDefault();
    
    if (!roomName) {
      alert("Please provide a room name");
      return;
    }

    try {
      const noti = await fetch("http://localhost:8080/createChatRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
      roomName: roomName, 
      roomOwnerId: user.uid,
    }),
      });
      const response = await noti.json();
      if (noti.ok) {
        console.log("Room created successfully:", response);
      } else {
        console.error("Failed to create room:", response);
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }

  async function addNewMember(e) {
    e.preventDefault();

    if (!roomId || !memberEmail) {
      alert("Room ID and member email are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/addNewMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId,
          newMemberId: "vEvqQivftfVnEAkbnnrBD4gxmKL2", // should be fetched based on email
        }),
      });
      const response = await res.json();
      if (res.ok) {
        console.log("Member added successfully:", response);
      } else {
        console.error("Failed to add member:", response);
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  }
  const openOverlay =() =>{
    setOverlayOpen(true);
  }
  const closeOverlay = () => {
    setOverlayOpen(false);
  };

  return (
    <div className="sidebar">
      {/* Sidebar content */}
      <div className="sidebar-item profile">
        <img src="/Logo.png" alt="Logo" className="logo" />
      </div>

      <div className="sidebar-item">
        <button onClick={openOverlay}>
          <i className="far fa-plus-square" style={{ fontSize: "24px", color: "white" }}></i>
        </button>
      </div>

      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-title">
              <h4>Tạo nhóm</h4>
              <button onClick={closeOverlay}>
                <i className="far fa-times-circle" style={{ fontSize: "24px" }}></i>
              </button>
            </div>
            <div>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Room Name"
              />
            </div>
            <div className="search">
              <input
                type="text"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                placeholder="Nhập email"
              />
              <button onClick={addNewMember}>Thêm</button>
            </div>
            <div className="list">
              <JoinedRooms />
            </div>
            <button
    onClick={createNewRoom}
    style={{
      backgroundColor: "#4CAF50", // Màu nền cho button
      color: "white", // Màu chữ
      padding: "10px 20px", // Khoảng cách bên trong
      fontSize: "16px", // Kích cỡ chữ
      cursor: "pointer", // Con trỏ chuột
      border: "none", // Bỏ viền
      borderRadius: "5px", // Viền bo tròn
    }}
  >
    Tạo Phòng
  </button>
          </div>
        </div>
      )}

      <div className="sidebar-item">
        <button onClick={logout}>
          <i className="fas fa-sign-out-alt" style={{ fontSize: "26px", color: "white" }}></i>
          <span style={{ marginLeft: "8px", color: "white" }}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
