import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config"; // Make sure storage is imported correctly from your config

// Hàm gửi tin nhắn, có thể gửi văn bản, ảnh hoặc cả hai
async function sendMessage(roomId, sender, message, imageFile) {
  try {
    let imageUrl = null;

    // Nếu có ảnh thì upload lên Firebase Storage
    if (imageFile) {
      // Generate a unique file name using a timestamp
      const uniqueFileName = `${Date.now()}_${imageFile.name}`;
      const storageRef = ref(storage, `chat-rooms/${roomId}/${uniqueFileName}`);
      console.log("Uploading image...");

      // Upload ảnh lên Storage
      const snapshot = await uploadBytes(storageRef, imageFile);
      console.log("Image uploaded successfully");

      // Lấy URL ảnh sau khi upload
      imageUrl = await getDownloadURL(snapshot.ref);
      console.log("Image URL:", imageUrl);
    }

    // Kiểm tra xem có nội dung tin nhắn nào không (văn bản hoặc ảnh)
    if (!message.trim() && !imageUrl) {
      console.error("No message or image to send.");
      return; // Không có gì để gửi
    }

    // Lưu thông tin tin nhắn vào Firestore
    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      text: message ? message.trim() : null, // Lưu văn bản nếu có
      sender: sender,
      imageUrl: imageUrl, // Lưu URL của ảnh nếu có
      timestamp: serverTimestamp(), // Dùng timestamp để sắp xếp
    });

    console.log("Message sent successfully");
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

// Hàm đọc tin nhắn từ Firestore
function readMessages(roomId, callback) {
  try {
    return onSnapshot(
      query(
        collection(db, "chat-rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(messages);
      }
    );
  } catch (err) {
    console.error("Error reading document: ", err);
  }
}

export { sendMessage, readMessages };
