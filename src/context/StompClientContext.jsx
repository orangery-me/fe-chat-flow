import { createContext, useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useAuth } from "../hooks/useAuth";

const StompClientContext = createContext();

export const StompClientProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useAuth();

    // Sử dụng ref để giữ giá trị của onMessageCallback
    const messageCallbackRef = useRef(null);
    const notificationCallbackRef = useRef(null);

    // Hàm để set callback
    const setOnMessageCallback = (callback) => {
        messageCallbackRef.current = callback;
    };

    const setOnNotificationCallback = (callback) => {
        notificationCallbackRef.current = callback;
    };

    function onMessageReceived (newMessage) {
        const parsedNewMessage = JSON.parse(newMessage.body);
        console.log("soobin", parsedNewMessage);

        // Gọi hàm callback nếu nó đã được set
        if (messageCallbackRef.current) {
            messageCallbackRef.current(parsedNewMessage);
        }

        if (notificationCallbackRef.current) {
            notificationCallbackRef.current(parsedNewMessage);
        }

    }

    useEffect(() => {
        if (!user) {
            // console.log("User is not authenticated");
            return;
        }
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
        });
        setStompClient(stompClient);

        stompClient.activate();

        stompClient.onConnect = () => {
            console.log('ok connected');

            setIsConnected(true);
            // subscribe to the topic, the callback is invoked whenever a message is received

            // subcribe to the user's queue (receive noti)
            stompClient.subscribe(`/user/${user.uid}/queue/messages`, onMessageReceived);
            // subscribe to the public topic (got who is connected )
            stompClient.subscribe(`/user/public`, onMessageReceived);

            // register the connected user to server 
            stompClient.publish(
                {
                    destination: '/app/addUser',
                    body: JSON.stringify({
                        uid: user.uid,
                        fullname: user.displayName,
                        photoURL: user.photoURL,
                        status: 'ONLINE',
                        email: user.email
                    })
                }
            );
        }

        stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        // deactivate the client when the component is unmounted
        return () => {

            stompClient.deactivate();
        }
    }, [user]);


    return (
        <StompClientContext.Provider value={{ stompClient, isConnected, setOnMessageCallback, setOnNotificationCallback }}>
            {children}
        </StompClientContext.Provider>
    );
}

export const useStompClient = () => useContext(StompClientContext);
