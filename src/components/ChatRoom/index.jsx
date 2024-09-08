import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { chatRooms } from "../../data/chatRooms";
import './styles.css';
import MessageInput from "../MessageInput";
import MessageList from "../MessageList";

function ChatRoom () {
    const param = useParams();
    const room = chatRooms.find(room => room.id === param.id);

    return (
        <div className="container">
            <h2>
                {room.title}
            </h2>
            <div>
                <Link to="/">
                    Back to Home
                </Link>
            </div>
            <div className="messages-container">
                <MessageInput roomId={room.id}></MessageInput>
                <MessageList  roomId={room.id}></MessageList>
            </div>
        </div>
    );
}

export default ChatRoom ;