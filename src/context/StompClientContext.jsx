import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { useAuth } from "../hooks/useAuth";

const StompClientContext = createContext();

export const StompClientProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const [onMessageCallback, setOnMessageCallback] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useAuth();

    function onMessageReceived (newMessage) {
        console.log(newMessage.body);
        const parsedNewMessage = JSON.parse(newMessage.body);

        if (onMessageCallback) {
            onMessageCallback(parsedNewMessage);
        }
    }

    useEffect(() => {
        if (!user) {
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
                        status: 'ONLINE'
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
        <StompClientContext.Provider value={{ stompClient, isConnected, setOnMessageCallback}}>
            {children}
        </StompClientContext.Provider>
    );
}

export const useStompClient = () => useContext(StompClientContext);
