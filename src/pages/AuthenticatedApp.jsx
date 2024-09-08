import React from 'react';
import { Link } from 'react-router-dom';
import { chatRooms } from '../data/chatRooms';
import { useAuth } from '../hooks/useAuth';
import '../index.css';

function AuthenticatedApp () {
    const info = useAuth();

    return (
        <>
            <h2>Welcome { info.user.displayName}</h2>
            <button onClick={info.logout} >
                Logout
            </button>
            <h2>Choose a Chat Room</h2>
            <ul className="chat-room-list">
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AuthenticatedApp;