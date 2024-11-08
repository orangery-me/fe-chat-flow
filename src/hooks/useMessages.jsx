import { useState, useEffect } from 'react';
import { useStompClient } from '../context/StompClientContext';

function useMessages (roomId) {
    const [messages, setMessages] = useState([]);
    const { setOnMessageCallback } = useStompClient();

    async function fetchMessages (roomId) {
        var res = await fetch(`http://localhost:8080/getMessages/${roomId}`);
        var data = await res.json();
        console.log(data);
        return data;
    }

    useEffect(() => {
        fetchMessages(roomId).then(data => {
            setMessages(data);
        });

        const messageCallback = (newMessage) => {
            console.log("Callback called");
            if (newMessage && newMessage.chatRoomId === roomId) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        };

        // set value for the callback function in StompClientContext
        setOnMessageCallback(messageCallback);

        return () => {
            setOnMessageCallback(null); // Clear the callback
        };

    }, [setOnMessageCallback, roomId]);

    return messages;
}

export { useMessages };