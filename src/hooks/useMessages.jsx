import { useState, useEffect } from "react";
import { useStompClient } from "../context/StompClientContext";
import { API } from ".././ipConfig";
function useMessages (roomId) {
  const [messages, setMessages] = useState([]);
  const { setOnMessageCallback } = useStompClient();

  async function fetchMessages (roomId) {
    var url = `${API}getMessages/${roomId}`;
    if (roomId.startsWith("pr")) url = `${API}getPrivateMessages/${roomId}`;

    var res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        'ngrok-skip-browser-warning': 'true'
      },
    });
    var data = await res.json();
    return data;
  }

  useEffect(() => {
    const messageCallback = () => {
      fetchMessages(roomId).then((data) => {
        setMessages(data);
      });
    };

    // set value for the callback function in StompClientContext
    setOnMessageCallback(messageCallback);

    return () => {
      setOnMessageCallback(null); // Clear the callback
    };
  }, [setOnMessageCallback, roomId]);

  useEffect(() => {
    fetchMessages(roomId).then((data) => {
      setMessages(data);
    });
  }, [roomId]);

  return messages;
}

export { useMessages };
