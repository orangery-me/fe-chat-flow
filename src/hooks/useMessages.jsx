import { useState, useEffect } from 'react';
import { useStompClient } from '../context/StompClientContext';

function useMessages (roomId) {
    const [messages, setMessages] = useState([]);
    const { setOnMessageCallback } = useStompClient();

    async function fetchMessages (roomId) {
        var url=`http://localhost:8080/getMessages/${roomId}`;
        if (roomId.startsWith("pr"))
            url = `http://localhost:8080/getPrivateMessages/${roomId}`;
        
        var res = await fetch(url);
        var data = await res.json();
        return data;
    }

    useEffect(() => {
        const messageCallback = (newMessage) => {
            fetchMessages(roomId).then(data => {
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
        fetchMessages(roomId).then(data => {
            setMessages(data);
        });

    }, [roomId]);

    return messages;
}

export { useMessages };