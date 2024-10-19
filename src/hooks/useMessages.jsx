import { useState, useEffect } from 'react';
import { useStompClient } from '../Context/StompClientContext';

function useMessages (roomId) {
    const [messages, setMessages] = useState([]);
    const {setOnMessageCallback} = useStompClient();

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

        // set value for the callback function in StompClientContext
        setOnMessageCallback((newMessage) => {
            if (newMessage && newMessage.chatRoomId === roomId) {
                setMessages((prevMessages) => {
                    return [...prevMessages, newMessage];
                });
            }
        })

    }, [setOnMessageCallback, roomId]);

    return messages;
}

export { useMessages };