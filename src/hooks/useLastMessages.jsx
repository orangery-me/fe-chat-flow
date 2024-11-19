import { useState, useEffect } from 'react';
import { useStompClient } from '../context/StompClientContext';

function useLastMessage () {
    const { lastMessagesRef } = useStompClient();
    const [lastMessages, setLastMessages] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            // Lấy dữ liệu từ ref và cập nhật state
            setLastMessages({ ...lastMessagesRef.current });
        }, 1000); // Update thường xuyên (100ms)

        return () => clearInterval(interval);
    }, [lastMessagesRef]);

    return lastMessages;
}

export { useLastMessage };
