import { readMessages } from "../services/firebase";
import { useEffect, useState } from "react";

function useMessages (roomId) {
    const [messages, setMessages] = useState([]);
    
    // get messages, re-run when roomId changes
  useEffect(() => { 
        // unsubcribe is used to stop listening to changes in the collection -> prevent memory leaks
      const unsubcribe = readMessages(roomId, setMessages);
        // return a cleanup function when the component unmounts or roomId changes
      return unsubcribe;
  }, [roomId]);
  
  return messages;
}

export { useMessages };