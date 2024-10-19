import React from 'react';
import { useRooms } from '../../hooks/useRooms';
import { Link } from 'react-router-dom';

function JoinedRooms ({ userId }) {
    const containerRef = React.useRef(null);
    const joinedRooms = useRooms(userId);

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    });

    return (
        joinedRooms && joinedRooms.map((room, index) => (
            <div className="group">
              <img src="" alt="avatar" className="imagine"></img>
              <div className="group-item">
                <div className="info" key={room.id}>
                <Link to={`/chat/${room.id}`}> {room.roomName} </Link>
                </div>
              </div>
            </div>
        ))
    );
}


export { JoinedRooms };

