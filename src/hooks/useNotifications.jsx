import { useState, useEffect, useRef } from "react";
import { useStompClient } from "../context/StompClientContext";
import { API } from ".././ipConfig";
function useNotifications (userId) {
  const [noti, setNoti] = useState([]);
  const { setOnNotificationCallback } = useStompClient();

  async function fetchNotificationsByUser (userId) {
    var url = `${API}getNotifications/` + userId;
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
    const notiCallback = () => {
      fetchNotificationsByUser(userId).then((data) => {
        setNoti(data);
      });
    };
    // set value for the callback function in StompClientContext
    setOnNotificationCallback(notiCallback);

    return () => {
      setOnNotificationCallback(null); // Clear the callback
    };
  }, [setOnNotificationCallback]);

  useEffect(() => {
    fetchNotificationsByUser(userId).then((data) => {
      setNoti(data);
    });
  }, [userId]);

  return { noti, setNoti };
}

export { useNotifications };
