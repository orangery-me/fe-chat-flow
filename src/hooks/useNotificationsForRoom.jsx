import { useState, useEffect } from "react";
import { API } from "../ipConfig";
function useNotificationsForRoom(roomId) {
  const [noti, setNoti] = useState([]);

  const markAsRead = async (roomId) => {
    noti.forEach(async (notification) => {
      var url = `${API}markAsRead/` + notification.notificationId;
      if (notification.roomId === roomId) {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
      }
    });
  };

  async function fetchNotificationsByRoom(roomId) {
    var url = `${API}getNotificationsByRoom/` + roomId;
    var res = await fetch(url);
    var data = await res.json();
    return data;
  }

  useEffect(() => {
    fetchNotificationsByRoom(roomId).then((data) => {
      // console.log('noti of room: ' + data);
      setNoti(data);
    });
  }, [roomId]);

  return { noti, markAsRead };
}
export { useNotificationsForRoom };
