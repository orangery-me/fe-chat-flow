import React from 'react';
import { useRooms } from '../../hooks/useRooms';
import { Link } from 'react-router-dom';

function JoinedRooms({ userId }) {
    const containerRef = React.useRef(null);
    const joinedRooms = useRooms(userId);

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [joinedRooms]);

    return (
        <div ref={containerRef}>
            {joinedRooms && joinedRooms.map((room) => (
                 <UsernameId2 key = {room.id} room={room}/>
            ))}
        </div>
    );
}

function UsernameId2({ room }) {
    let displayName;
    const {roomName, user2Id} = room;
    if (roomName) displayName = roomName;
    if (user2Id)
     displayName= user2Id;
    return (
        <div className="group">
        <img src="" alt="avatar" className="imagine" />
        <div className="group-item">
            <div className="info">
                <Link to={`/chat/${room.id}`}>{displayName}</Link>
            </div>
        </div>
    </div>
    );
}

export { JoinedRooms };
