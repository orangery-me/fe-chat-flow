import { useState, useEffect } from 'react';
import { useStompClient } from '../context/StompClientContext';

function useNotifications (userId) {
    const [noti, setNoti] = useState([]);
    const { setOnNotificationCallback } = useStompClient();

    async function fetchNotifications (userId) {
        var url = `http://localhost:8080/getNotifications`;

        var res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId }),
        });
        var data = await res.json();
        return data;
    }

    useEffect(() => {
        const notiCallback = (noti) => {
            fetchMessages(userId).then(data => {
                setNoti(data);
            });
        };

        // set value for the callback function in StompClientContext
        setOnNotificationCallback(notiCallback);

        return () => {
            setOnNotificationCallback(null); // Clear the callback
        };

    }, [setOnNotificationCallback, userId]);


    useEffect(() => {
        fetchNotifications(userId).then(data => {
            setNoti(data);
        });

    }, [userId]);

    return noti;
}

export { useNotifications };