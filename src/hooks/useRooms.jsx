import { useState, useEffect } from "react";
import { API } from ".././ipConfig";
function useRooms (userId) {
  const [joinedRooms, setJoinedRooms] = useState([]);

  const onCreateRoom = async (formData) => {
    try {
      const response = await fetch(`${API}createChatRoom`, {
        method: "POST",
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        body: formData,
      });

      const textResponse = await response.text();

      if (response.ok) {
        const data = JSON.parse(textResponse);
        updateWithNewRoom(data);
        console.log("Room created successfully:", data);
        return data;
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const fetchAllJoinedRooms = async (userId) => {
    try {
      const dataJoinedRooms = await fetch(`${API}getJoinedRooms?userId=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true'
        },
      })
        .then((res) => res.clone().json());
      const dataPrivateRooms = await fetch(`${API}getJoinedPrivateRooms?userId=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true'
        },
      }).then((res) => res.clone().json());
      console.log("dataJoinedRooms: ", dataJoinedRooms);
      console.log("dataPrivateRooms: ", dataPrivateRooms);
      const combinedRooms = [...dataJoinedRooms, ...dataPrivateRooms];

      setJoinedRooms(combinedRooms);
    } catch (error) {
      console.error("Error fetching joined rooms:", error);
    }
  };

  useEffect(() => {
    fetchAllJoinedRooms(userId);
  }, [userId]);

  const updateWithNewRoom = (newRoom) => {
    setJoinedRooms((prevRooms) => {
      const updatedRooms = [...prevRooms, newRoom];
      return updatedRooms;
    });
    console.log("Updated joinedRooms: ", joinedRooms);
  };

  return { joinedRooms, onCreateRoom };
}

export { useRooms };
