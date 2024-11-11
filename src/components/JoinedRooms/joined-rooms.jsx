import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRooms } from '../../hooks/useRooms';
import { Link } from 'react-router-dom';

function JoinedRooms ({ userId }) {
    const containerRef = useRef(null);
    const { joinedRooms } = useRooms(userId);
    const [displayNames, setDisplayNames] = useState({});

    // useEffect(() => {
    //     const fetchDisplayNames = async () => {
    //         const names = {};
    //         await Promise.all(
    //             joinedRooms.map(async (room) => {
    //                 const { roomName, user1Id } = room;
    //                 if (roomName) {
    //                     names[room.id] = roomName;
    //                 }
    //                 if (user1Id) {
    //                     try {
    //                         const response = await fetch(`http://localhost:8080/findById?Id=${user1Id}`);
    //                         const data = await response.json();

    //                         names[room.id] = data.fullname;
    //                         console.log(names);

    //                     } catch (error) {
    //                         names[room.id] = 'Error loading name';
    //                     }
    //                 }
    //             })
    //         );
    //         setDisplayNames(names);
    //     };

    //     fetchDisplayNames();
    // }, [joinedRooms]);

    const fetchDisplayNames = useCallback(async () => {
        const names = {};
        await Promise.all(
            joinedRooms.map(async (room) => {
                const { roomName, user1Id } = room;
                if (roomName) {
                    names[room.id] = roomName;
                }
                if (user1Id) {
                    try {
                        const response = await fetch(`http://localhost:8080/findById?Id=${user1Id}`);
                        const data = await response.json();
                        names[room.id] = data.fullname;
                    } catch (error) {
                        names[room.id] = 'Error loading name';
                    }
                }
            })
        );
        setDisplayNames((prevDisplayNames) => ({ ...prevDisplayNames, ...names }));
    }, [joinedRooms]);

    useEffect(() => {
        fetchDisplayNames();
    }, [joinedRooms, fetchDisplayNames]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [joinedRooms]);

    return (
        <div ref={containerRef}>
            {joinedRooms.map((room) => (
                <div className="group" key={room.id}>
                    <img src="" alt="avatar" className="imagine" />
                    <div className="group-item">
                        <div className="info">
                            <Link to={`/chat/${room.id}`}>
                                {displayNames[room.id] || 'Loading...'}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export { JoinedRooms };
