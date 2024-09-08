import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"

async function sendMessage (roomId, sender, message) {
    try {
        await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
            'text': message.trim(),
            'sender': sender,
            'timestamp': serverTimestamp(),
        })
    } catch (err) {
        console.error('Error adding document: ', err);
   }
}

function readMessages (roomId, callback) {
    try {
        return onSnapshot(
            query(
                collection(db, 'chat-rooms', roomId, 'messages'),
                orderBy('timestamp', 'asc')
            ),
            (querySnapshot) => {
                const messages = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                // console.log("query snapshot" +querySnapshot);
                callback(messages);
            }
        );
    }catch(err) {
        console.error('Error reading document: ', err);
    }
}

export {  sendMessage, readMessages };

